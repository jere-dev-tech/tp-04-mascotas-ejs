const express = require("express");
const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");

const { leerJson } = require("./archivos");

async function main() {
  try {
    const rutaDatos = path.join(__dirname, "..", "datos", "mascotas.json");
    const mascotas = await leerJson(rutaDatos);

    const app = express();
    const PORT = 3000;

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "..", "views"));

    app.use(expressLayouts);
    app.set("layout", "layouts/main");

    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
      res.render("inicio", {
        titulo: "Inicio",
      });
    });

    app.get("/mascotas", (req, res) => {
      res.render("mascotas/lista", {
        titulo: "Catálogo de mascotas",
        mascotas,
      });
    });

    app.get("/mascotas/nueva", (req, res) => {
      res.render("mascotas/nueva", {
        titulo: "Nueva mascota",
        error: null,
        valores: {},
      });
    });

    app.post("/mascotas", (req, res) => {
      const { nombre, especie, edad, estado, descripcion } = req.body;

      const edadNumero = Number(edad);

      if (
        !nombre ||
        !especie ||
        !estado ||
        !descripcion ||
        edad === "" ||
        Number.isNaN(edadNumero) ||
        edadNumero < 0
      ) {
        return res.status(400).render("mascotas/nueva", {
          titulo: "Nueva mascota",
          error: "Completá todos los campos correctamente.",
          valores: req.body,
        });
      }

      const nuevoId =
        mascotas.length > 0 ? mascotas[mascotas.length - 1].id + 1 : 1;

      const nuevaMascota = {
        id: nuevoId,
        nombre,
        especie,
        edad: edadNumero,
        estado,
        descripcion,
        imagen: "/img/mi-perro.jpg",
      };

      mascotas.push(nuevaMascota);

      res.redirect("/mascotas");
    });

    app.get("/mascotas/:id", (req, res) => {
      const id = Number(req.params.id);

      const mascota = mascotas.find((mascota) => mascota.id === id);

      if (!mascota) {
        return res.status(404).render("no-encontrado", {
          titulo: "Mascota no encontrada",
        });
      }

      res.render("mascotas/detalle", {
        titulo: mascota.nombre,
        mascota,
      });
    });

    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
      console.log(`Mascotas cargadas: ${mascotas.length}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error.message);
    process.exitCode = 1;
  }
}

main();
