# PRACTICA 2

## Desarrollado por

- [Adrian Naranjo](https://www.linkedin.com/in/adrian-naranjo/)
- [Sergio Redondo](https://www.linkedin.com/in/sergio-redondo-montes/)

## SETUP PREVIO

- [Instalación de Node.js y NPM ](https://nodejs.org/en/download/)

En caso de tenerlo instalado comprobaremos la versión de cada uno:

```console
node -v
```

```console
npm -v
```

- [Instalación de MongoDB](https://www.mongodb.com/download-center/community)

Para comprobar su versión:

```console
mongo --version
```

### Lanzamiento de MongoDB

Usaremos mongodb de manera local. Por lo que instalaremos el programa MongoDB Compass para visualizarlo.

Para inicializarlo:

```console
mongod
```

Despúes entraremos a MongoDB Compass y nos conectaremos a `localhost` y al puerto `2717`por defecto

## Inicialización de la Aplicación

Crearemos una carpeta llamada `servidor-node`. Desde ella lanzaremos el siguiente comando desde el terminal:

```console
npm init -y
```

De esta manera generará un `package.json` de manera automática.

### Instalación de express

Express es el framework que usaremos para la parte de backend de la mano de Node.js. Es el más popular de todos los frameworks dentro de Node.js.

```console
//Manera tradicional
npm install express

//Manera abreviada
npm i express
```

### Instalación de nodemon

Esta herramienta nos permitirá reiniciar la aplicación cada vez que se detecte algun cambio en los archivos. Por lo que lo añadiremos en las dependencias de desarrollo para que no se use en producción

```console
npm i --save-dev nodemon
```

Esto generará `dev-dependencies` en el `package.json`

### Estructura del proyecto

Crearemos dentro del proyecto la siguiente estructura:

```console
.
├── app.js
├── node_modules (Se generará automáticamente)
│   └── ...
├── package.json
├── package-lock.json (Se generará automáticamente)
├── routes
│   └── index.js
└── start.js
```

#### `app.js`

Dentro de este archivo crearemos el siguiente contenido:

```js
const express = require("express");
const routes = require("./routes/index");

const app = express();
app.use("/", routes);

module.exports = app;
```

Utilizaremos express para inicializar la aplicación.

A su vez, usaremos las rutas de las que dispondrá la aplicación para su funcionamiento.

Exportaremos el objeto `app` para usarlo en el siguiente fichero.

#### `start.js`

Importaremos app y lanzaremos la aplicación para que escuche en el puerto 3000

```js
const app = require("./app");

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
```

#### `routes/index.js`

En este fichero crearemos las rutas con sus funciones a las que se tendrá acceso desde el navegador.

```js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("It works!");
});

module.exports = router;
```

Cada ruta se compone de lo siguiente:

```js
router.METHOD(route, (req, res) => {
  // Función
});

METHOD: (GET, POST, PUT, PATCH, DELETE)
route: Ruta que aparecerá en el navegador para acceder a esta función
req: request, lo obtenido al llamar a la función por parte del cliente
res: response, lo que se devolverá al cliente
```

### Preparación para lanzamiento

Dentro del `package.json` sustituiremos `scripts` por lo siguiente:

```js
"scripts": {
  "watch": "nodemon ./start.js"
},
```

De esta manera, cuando lancemos `npm run watch` desde el terminal, podremos acceder a la siguiente url [http://localhost:3000](http://localhost:3000)

## TEMPLATE CON PUG

Pug (anteriormente conocido como Jade) es un motor de plantilla de Node.js. con el que seremos capaces de escribir código HTML de una sintaxis mucho más sencilla, clara y directa, tanto a la hora de escribir como de leer y modificar.

### Instalación

```console
npm i pug
```

### Información de uso de PUG

Desde este enlace tendras una información más detallada de como usar esta librería:
[Enlace PUG](https://www.silocreativo.com/introduccion-primeros-pasos-pug/)

### Preparacion de vistas

<font color='red'>Atencion</font>
<br>
<font color='red' size=2>Esta librería para su correcto funcionamiento utiliza tabulación</font>

Crearemos una carpeta `views` y un fichero `signup.pug` dentro de ella con el siguiente código:

```pug
 form(action="." method="POST")
    label(for="name") Name:
    input(
      type="text"
      id="name"
      name="name"
    )

    label(for="email") Email:
    input(
      type="email"
      id="email"
      name="email"
    )

    label(for="password") Password:
    input(
      type="password"
      id="password"
      name="password"
    )

    input(
      type="submit"
      value="Submit"
    )
```

Este formulario lo utilizaremos para la parte de registro dentro de la aplicación.

El siguiente formulario con el nombre de `signin.pug` que utilizaremos para la parte de inicio de sesión.

```pug
form(action="." method="POST")
    label(for="email") Email:
    input(
        type="email"
        id="email"
        name="email"
    )

    label(for="password") Password:
    input(
        type="password"
        id="password"
        name="password"
    )

    input(
        type="submit"
        value="Submit"
    )
```

### Integracion de Pug con la aplicación

En el archivo `app.js` cambiaremos el contenido por lo siguiente:

```js
const express = require("express");
const path = require("path");
const routes = require("./routes/index");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/", routes);

module.exports = app;
```

De esta manera le estamos indicando que el <b>view engine</b> a utilizar será <b>pug</b> y le indicamos donde se encontrarán esas <b>vistas</b>.

### Alteración de las rutas

En el archivo `routes/index.js` cambiaremos el contenido por lo siguiente:

```js

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signin');
});

router.get('/signup'), (req, res) => {
    res.render('signup');
});

module.exports = router;

```

### Template Layout

Necesitaremos crear la base de la template con la inicialización de que es un fichero HTML

Por lo que craremos `layout.pug` dentro de la carpeta de `views`.

```pug
doctype html
html
  head
    title= `${title}`

  body
    block content

```

De esta manera el titulo se lo podremos enviar dinámicamente y asi variarlo desde la ruta en la que se encuentre.
<br>
También tendremos el bloque de content para sustituir por otros bloques que ya hemos definido.

#### Uso de `layout.pug` en las templates definidas

Añadiremos en los archivos `signin.pug` y `signup.pug` el siguiente contenido:

```pug
extends layout

    block content
```

<font color="red">Cuidado</font> tendremos que añadir tabulación al resto del contenido

#### Implementación de los `titles` en cada ruta

Cambiando el contenido de nuestro archivo `routes/index.js` por esto, tendremos los titulos de manera dinámica.

```js

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signin',{title:'Inicio de sesión'});
});

router.get('/signup'), (req, res) => {
    res.render('signup',{title:'Registro'});
});

module.exports = router;

```

## Formularios en Express

Comenzamos con el tratamiento de un formulario desde express.

Añadiremos las siguientes rutas en el archivo `routes/index.js`

```js
router.post('/', (req, res) => {
  res.render('form', { title: 'Inicio de sesión' });
});

router.post('/signup'), (req, res) => {
    res.render('signup',{title:'Registro'});
});
```

Así estamos añadiendo la aceptación del metodo POST para esas rutas. Porque sino al pulsar el boton submit, la aplicación devolvería un error indicando que ese método no está definido.

### Visualización de la respuesta

Por defecto, la aplicación no devuelve el contenido de los inputs.

Necesitamos instalar la siguiente librería para poder acceder a la respuesta.

```console
npm i body-parser
```

Y añadiremos lo siguiente dentro de `app.js`:

```js
const bodyParser = require('body-parser');
...
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

module.exports = app;
```

Si añadimos un `console.log(req.body);` dentro de una funcion de alguna ruta que sea POST, podremos visualizar el contenido que se ha enviado por el formulario.

## Validación de formulario

Para implementar validación a los formularios, usaremos la siguiente librería:

```console
npm i express-validator
```

Y deberemos añadir lo siguiente al principio de `routes/index.js`

```js
const { check, validationResult } = require("express-validator");
```

### Comprobación de inputs

Añadiremos el siguiente código a la ruta de registro por <b>POST</b>:

```js
router.post('/signup',
  [
    check('name')
      .isLength({ min: 4 })
      .withMessage('Introduce un nombre con un mínimo de 4 caracteres'),
    check('email')
      .isEmail()
      .withMessage('Introduce un email válido'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Introduce una contraseña con un mínimo de 8 caracteres'),
  ],
  (req, res) => {
    ...
  });
```

Y para la ruta de inicio de sesión por <b>POST</b>:

```js
router.post('/',
  [
    check('email')
      .isEmail()
      .withMessage('Introduce un email válido'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Introduce una contraseña con un mínimo de 8 caracteres'),
  ],
  (req, res) => {
    ...
  });
```

### Mostrar errores al cliente

Ahora tendremos que añadir a las funciones utilizadas en el apartado anterior, en la parte de la funcion:

```js
router.post('/signup',
  [
   ...
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      res.send('El registro ha sido validado correctamente');
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  });
```

Ahora vamos a hacer algunos cambios en nuestra plantilla `form.pug` . Lo primero que necesitamos hacer el chequear los errores y si hay mostrarlos. Vamos a mostrarlos en formato lista.

```pug
extends layout

block content
  if errors
    ul
      for error in errors
        li= error.msg
  ...
```

Finalmente, comprobaremos si el atributo data existe, y si es así usaremos los valores de los respectivos campos. Si no existe, inicializaremos data a un objeto vacío. De esta manera el primer render funcionará de manera correcta.

```pug
-data = data || {}
```

Después debemos hacer referencia al atributo con el valor del campo de la siguiente manera:

```pug
input(
  type="text"
  id="name"
  name="name"
  value=data.name
)
```

Nos quedaría lo siguiente:

```pug
extends layout

block content
  -data = data || {}

  if errors
    ul.my-errors
      for error in errors
        li= error.msg

  form(action="/signup" method="POST" )
    label(for="name") Name:
    input(
      type="text"
      id="name"
      name="name"
      value=data.name
    )

    label(for="email") Email:
    input(
      type="email"
      id="email"
      name="email"
      value=data.email
    )

    label(for="password") Password:
    input(
      type="password"
      id="password"
      name="password"
      value=data.password
    )

    input(
      type="submit"
      value="Submit"
    )

```

## Interacción con la Base de Datos

### Especificar los datos de conexión

En nuestro caso como hemos visto más arriba vamos a usar Mongo. Para conectarnos a Mongo vamos a usar el paquete [dotenv](https://www.npmjs.com/package/dotenv). Dotenv cargará los detalles de configuranción desde el fichero de de NODE [process.env](https://nodejs.org/docs/latest/api/process.html#process_process_env)

La instalacion es:

```
npm install dotenv
```

Y haremos el require de el en la parte superior de `start.js`

```js
require("dotenv").config();
```

Ahora crearemos el fichero `.env`in el raiz del proyecto y escribirimos la siguiente línea de configuración de la conexión de Mongo

```
DATABASE=mongodb://localhost:27017/<dbname>
```

### Conectar con la Base de Datos

Para cvonectarnos a la base de datos y hacer las operaciones sobre ella, usaremos [Moongoose](https://www.npmjs.com/package/mongoose) Moongoose es un ODM(object-document mapper) para MongoDB.

Moongose nos permite tener una capa de abstracción sobre Mongo, ya que nos da una solucion basada en esquemas de modelos de datos. Moongose incluye type casting, validation, query building, business logic hooks y más.

Para instalar Moongoose:

```
npm install mongoose
```

Después haremos el required dentro de `start.js``

```js
const mongoose = require("mongoose");
```

y añadiremos la conexión que es algo así:

```js
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.log(`Connection error: ${err.message}`);
  });
```

Daros cuenta que usamos `DATABASE`como una variable que declaramos en el fichero `.env` donde especificamos la url de la base de datos.
Así debería quedar el fichero `start.js`:

```js
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.log(`Connection error: ${err.message}`);
  });

const app = require("./app");
const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
```

### Definiendo los esquemas de Moongoose

MongoDB puede usarse sin describir que tipo de datos vas a pasarle a lo largo del tiempo. Aún así, nosotros usaremos Moongoose para interactuar con la BBDD, y todo en Moongoose empieza por los [schema](https://mongoosejs.com/docs/guide.html). En Moongoose, cada schema mapea a MongoDB la colección y define la forma del documento dentro de la colección.

Vamos a crear la carpeta `models` en la raiz del proyecto y dentro de esta carpeta, crearemos un fichero llamado `User.js`.
Añadiremos el siguiente código a `User.js`:

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("User", UserSchema);
```

Aquí, solo estamos definiendo el tipo de entrada del usuario. Luego compilamos el modelo a partir del esquema y lo exportamos para usarlo en cualquier parte de la aplicación.

La pieza final es hacer el require del modelo en `start.js`:

```js
...

require('./models/Registration');
const app = require('./app');

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
```

### Guardar datos

Ahora estamos listos para guardar los datos del usuario en nuestra base de datos. Empezaremos requiriendo Moongoose e importando nuestro modelo dentro del fichero `routes/indes.js`:

```js
const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');
...
```

En `routes/index.js`:

```js
router.get("/registrations", (req, res) => {
  User.find()
    .then(users => {
      res.render("index", { title: "Listing registrations", users });
    })
    .catch(() => {
      res.send("Sorry! Something went wrong.");
    });
});
```

`.find()` Nos permite buscar varios elementos en la BBDD, si le pasamos parámetros nos devuelve todos los documentos que están relacionado con ese parámetro de busqueda, sino nos devuelve todos los documentos de la colección. Como la llamada es asíncrona, usaremos `.then()` para esperar por los datos y los recibiremos como la propiedad `users`. Si no recibimos datos devolveremos `users`como un array vacío.
En `views/index.pug` vamos a comprobar la longitud del array y si es mayor que cero mostraremos los datos, sino mostraremos el mensaje "No registrations yet"

```pug
extends layout

block content
  if users.length
    table
      tr
        th Name
        th Email
        th PassWord
      each user in users
        tr
          td= user.name
          td= user.email
          td= user.password
  else
    p No registrations yet
```

## Static Assets en Express

Vamos a darle algo de vida y de color a nuestra app y para ello vamos a utilizar [Bootstrap](https://getbootstrap.com/)
Para porder ver ficheros, imagenes JavaScript.. desde fuera de la app Express usa la funcion static que nos premite pasar una carpeta por parámetro para hacerla visible hacia el exterior

La manera más sencilla es añadir la siguiente linea a `app.js`:

```js
app.use(express.static("public"));
```

Ahora podemos cargar ficheros que esten en la carpeta `public`

### Estilos con Bootstrap

Crearemos la carpeta `public` en la raiz del proyecto, dentro de crearemos la carpeta `css`. Descargaremos la [versión mini de Bootstrap v4](https://getbootstrap.com/docs/4.4/getting-started/download/) y meteremos dentro de esta carpeta el fichero descomprimido `bootstrap.min.css`.

Ahora añadiremos estilos a nuestras plantillas de pug
En `layout.pug`:

```pug
doctype html
html
  head
    title= `${title}`
    link(rel='stylesheet', href='/css/bootstrap.min.css')
    link(rel='stylesheet', href='/css/styles.css')

  body
    div.container.listing-reg
      h1 My Amazing App

      block content
```

Hemos incluido dos css que guardamos en la carpeta public.

En `signup.pug` añadiremos algunas clases de bootstrap para que quede más bonito nuentro formulario:

```pug
extends layout

block content
  -data = data || {}

  if errors
    ul.my-errors
      for error in errors
        li= error.msg

  form(action="/signup" method="POST" class="form-registration")
    label(for="name") Name:
    input(
      type="text"
      id="name"
      name="name"
      class="form-control"
      value=data.name
    )

    label(for="email") Email:
    input(
      type="email"
      id="email"
      name="email"
      class="form-control"
      value=data.email
    )

    label(for="password") Password:
    input(
      type="password"
      id="password"
      name="password"
      class="form-control"
      value=data.password
    )

    input(
      type="submit"
      value="Submit"
      class="btn btn-lg btn-primary btn-block"
    )

```

Ahoremos lo mismo en los demas formularios yu tambien en nuestro `index.pug`como se ve a continuación:

```pug
extends layout

block content
  if users.length
    table.listing-table.table-dark.table-striped
      tr
        th Name
        th Email
        th PassWord
      each user in users
        tr
          td= user.name
          td= user.email
          td= user.password
  else
    p No registrations yet :(
```

Finalmente, crearemos el fichero `style.css` en la carpeta `css` y añadiremos lo siguiente:

```css
body {
  padding: 40px 10px;
  background-color: #eee;
}

.listing-reg h1 {
  text-align: center;
  margin: 0 0 2rem;
}

/* css for registration form and errors*/
.form-registration {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.form-registration {
  display: flex;
  flex-wrap: wrap;
}

.form-registration input {
  width: 100%;
  margin: 0px 0 10px;
}

.form-registration .btn {
  flex: 1 0 100%;
}

.my-errors {
  margin: 0 auto;
  padding: 0;
  list-style: none;
  color: #333;
  font-size: 1.2rem;
  display: table;
}

.my-errors li {
  margin: 0 0 1rem;
}

.my-errors li:before {
  content: "! Error : ";
  color: #f00;
  font-weight: bold;
}

/* Styles for listing table */
.listing-table {
  width: 100%;
}

.listing-table th,
.listing-table td {
  padding: 10px;
  border-bottom: 1px solid #666;
}

.listing-table th {
  background: #000;
  color: #fff;
}

.listing-table td:first-child,
.listing-table th:first-child {
  border-right: 1px solid #666;
}
```
