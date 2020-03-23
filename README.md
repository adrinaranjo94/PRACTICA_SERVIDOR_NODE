# PRACTICA 2

## Desarrollado por

- Adrian Naranjo
- Sergio Redondo

## SETUP PREVIO

- [Instalación de Node.js y NPM ](https://nodejs.org/en/download/)

En caso de tenerlo instalado comprobaremos la versión de cada uno:

```
node -v
```

```
npm -v
```

- [Instalación de MongoDB](https://www.mongodb.com/download-center/community)

Para comprobar su versión:

```
mongo --version
```

### Lanzamiento de MongoDB

Usaremos mongodb de manera local. Por lo que instalaremos el programa MongoDB Compass para visualizarlo.

Para inicializarlo:

```
mongod
```

Despúes entraremos a MongoDB Compass y nos conectaremos a `localhost` y al puerto `2717`por defecto

## Inicialización de la Aplicación

Crearemos una carpeta llamada `servidor-node`. Desde ella lanzaremos el siguiente comando desde el terminal:

```
npm init -y
```

De esta manera generará un `package.json` de manera automática.

### Instalación de express

Express es el framework que usaremos para la parte de backend de la mano de Node.js. Es el más popular de todos los frameworks dentro de Node.js.

```
//Manera tradicional
npm install express

//Manera abreviada
npm i express
```

### Instalación de nodemon

Esta herramienta nos permitirá reiniciar la aplicación cada vez que se detecte algun cambio en los archivos. Por lo que lo añadiremos en las dependencias de desarrollo para que no se use en producción

```
npm i --save-dev nodemon
```

Esto generará `dev-dependencies` en el `package.json`

### Estructura del proyecto

Crearemos dentro del proyecto la siguiente estructura:

```
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

```
const express = require('express');
const routes = require('./routes/index');

const app = express();
app.use('/', routes);

module.exports = app;
```

Utilizaremos express para inicializar la aplicación.

A su vez, usaremos las rutas de las que dispondrá la aplicación para su funcionamiento.

Exportaremos el objeto `app` para usarlo en el siguiente fichero.

#### `start.js`

Importaremos app y lanzaremos la aplicación para que escuche en el puerto 3000

```
const app = require('./app');

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
```

#### `routes/index.js`

En este fichero crearemos las rutas con sus funciones a las que se tendrá acceso desde el navegador.

```
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('It works!');
});

module.exports = router;
```

Cada ruta se compone de lo siguiente:

```
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

```
"scripts": {
  "watch": "nodemon ./start.js"
},
```

De esta manera, cuando lancemos `npm run watch` desde el terminal, podremos acceder a la siguiente url [http://localhost:3000](http://localhost:3000)

## TEMPLATE CON PUG

Pug (anteriormente conocido como Jade) es un motor de plantilla de Node.js. con el que seremos capaces de escribir código HTML de una sintaxis mucho más sencilla, clara y directa, tanto a la hora de escribir como de leer y modificar.

### Instalación

```
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

```
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

```
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

```
const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);

module.exports = app;
```

De esta manera le estamos indicando que el <b>view engine</b> a utilizar será <b>pug</b> y le indicamos donde se encontrarán esas <b>vistas</b>.

### Alteración de las rutas

En el archivo `routes/index.js` cambiaremos el contenido por lo siguiente:

```

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

Por lo que craremos `layout.png` dentro de la carpeta de `views`.

```
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

```
extends layout

    block content
```

<font color="red">Cuidado</font> tendremos que añadir tabulación al resto del contenido

#### Implementación de los `titles` en cada ruta

Cambiando el contenido de nuestro archivo `routes/index.js` por esto, tendremos los titulos de manera dinámica.

```

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

```
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

```
npm i body-parser
```

Y añadiremos lo siguiente dentro de `app.js`:

```
const bodyParser = require('body-parser');
...
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

module.exports = app;
```

Si añadimos un `console.log(req.body);` dentro de una funcion de alguna ruta que sea POST, podremos visualizar el contenido que se ha enviado por el formulario.

## Validación de formulario

Para implementar validación a los formularios, usaremos la siguiente librería:

```
npm i express-validator
```

Y deberemos añadir lo siguiente al principio de `routes/index.js`

```
const { check, validationResult } = require('express-validator');
```

### Comprobación de inputs

Añadiremos el siguiente código a la ruta de registro por <b>POST</b>:

```
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

```
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

```
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
