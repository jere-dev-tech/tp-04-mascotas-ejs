const fs = require("node:fs/promises");

async function leerJson(rutaArchivo) {
  const contenido = await fs.readFile(rutaArchivo, "utf8");
  return JSON.parse(contenido);
}

module.exports = {
  leerJson,
};