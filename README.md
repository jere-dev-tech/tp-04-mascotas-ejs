# Trabajo práctico 04

## Descripción

Este proyecto es una aplicación web desarrollada con Node.js, Express y EJS.

La aplicación permite ver un catálogo de mascotas en adopción, consultar el detalle de cada una y agregar nuevas mascotas mediante un formulario.

Los datos iniciales se cargan desde un archivo JSON y las mascotas nuevas se guardan temporalmente en memoria mientras el servidor está funcionando.

## Instalación

Primero hay que clonar o descargar el proyecto.

Después, desde la carpeta raíz, instalar las dependencias con:

```bash
npm install
```

Las dependencias utilizadas son:

- Express
- EJS
- express-ejs-layouts

## Ejecución

Para iniciar la aplicación:

```bash
npm start
```

El servidor se ejecuta en:

```text
http://localhost:3000
```

Para comprobar la sintaxis de los archivos JavaScript:

```bash
npm run check
```

## Páginas y rutas

La aplicación utiliza las siguientes rutas:

### Inicio

```text
GET /
```

Muestra la página principal de la aplicación y un enlace al catálogo.

### Catálogo

```text
GET /mascotas
```

Muestra todas las mascotas cargadas en el sistema.

### Nueva mascota

```text
GET /mascotas/nueva
```

Muestra el formulario para agregar una nueva mascota.

### Detalle de mascota

```text
GET /mascotas/:id
```

Busca una mascota por su identificador y muestra todos sus datos.

Si el identificador no existe, se muestra una página de error 404.

### Crear mascota

```text
POST /mascotas
```

Recibe los datos enviados desde el formulario, los valida y agrega una nueva mascota al arreglo en memoria.

Después de crearla, la aplicación redirige nuevamente al catálogo.

## Estructura de vistas

Las vistas están organizadas dentro de la carpeta `views`.

```text
views/
├── layouts/
│   └── main.ejs
├── partials/
│   ├── encabezado.ejs
│   └── pie.ejs
├── mascotas/
│   ├── lista.ejs
│   ├── detalle.ejs
│   └── nueva.ejs
├── inicio.ejs
└── no-encontrado.ejs
```

### Layout

El layout es la estructura general que comparten todas las páginas.

En este proyecto se utiliza:

```text
views/layouts/main.ejs
```

Ahí se encuentra la estructura HTML principal, el encabezado, el contenido de cada página y el pie.

### Vistas

Las vistas representan el contenido particular de cada página.

Por ejemplo:

```text
inicio.ejs
mascotas/lista.ejs
mascotas/detalle.ejs
mascotas/nueva.ejs
```

### Parciales

Los parciales son fragmentos reutilizables.

En este proyecto se utilizan:

```text
encabezado.ejs
pie.ejs
```

De esta forma no es necesario repetir el mismo código en todas las páginas.

## Datos enviados con res.render

Express utiliza `res.render()` para renderizar una vista EJS y enviarle información.

Por ejemplo, en el catálogo se envía el arreglo de mascotas:

```js
res.render("mascotas/lista", {
  titulo: "Catálogo de mascotas",
  mascotas,
});
```

Luego EJS puede recorrer ese arreglo y mostrar cada mascota en la página.

## Recursos estáticos

Los recursos estáticos se encuentran dentro de la carpeta `public`.

```text
public/
├── css/
│   └── estilos.css
├── img/
│   └── mi-perro.jpg
└── js/
    └── app.js
```

Express los publica utilizando:

```js
express.static()
```

Esto permite acceder a archivos como:

```text
/css/estilos.css
/img/mi-perro.jpg
/js/app.js
```

sin escribir `/public` en la URL.

## Formulario

El formulario permite agregar una nueva mascota.

Solicita:

- nombre
- especie
- edad
- estado
- descripción

El formulario utiliza:

```html
<form action="/mascotas" method="post">
```

Para que Express pueda leer los datos enviados se utiliza:

```js
express.urlencoded({ extended: false })
```

Los datos del formulario llegan mediante:

```js
req.body
```

Antes de crear una mascota se verifica que todos los campos estén completos y que la edad sea válida.

Si hay un error, la aplicación responde con estado HTTP `400`, muestra un mensaje y conserva los valores ingresados.

## Recorrido POST, redirección y GET

Cuando se envía correctamente el formulario ocurre este recorrido:

```text
Formulario
    ↓
POST /mascotas
    ↓
Se crea la mascota
    ↓
Redirección a /mascotas
    ↓
GET /mascotas
    ↓
Se muestra nuevamente el catálogo
```

La redirección se realiza con:

```js
res.redirect("/mascotas");
```

## Persistencia de los datos

Las mascotas iniciales se cargan desde:

```text
datos/mascotas.json
```

Las nuevas mascotas que se agregan desde el formulario no se escriben en ese archivo.

Se guardan solamente en memoria mientras el servidor está funcionando.

Por este motivo, si se detiene y se vuelve a iniciar el servidor, las mascotas agregadas manualmente desaparecen y vuelven a cargarse solamente las mascotas originales del archivo JSON.

## Autor

Jeremías Mamani
