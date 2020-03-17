const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use("/static", express.static(__dirname + "/public"));

app.use(cookieParser());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.send("No tienes acceso al contenido, Inicia sesión");
});

// RECOGIDA DE PARAMETROS POR URL
app.get("/nombre/:name", function(req, res) {
  res.send("Bienvenido " + req.params.name);
});

// REDIRECCIONAMIENTO
app.get("/redirect", (req, res) => {
  res.redirect("/login");
});

// CREACIÓN COOKIE
app.get("/app/set-cookie/:value", (req, res) => {
  res.cookie("cookie-servidor", req.params.value);
  res.send("Cookie implementada");
});

// LECTURA COOKIE
app.get("/app/read-cookie", (req, res) => {
  res.send("Cookie valor guardado: " + req.cookies["cookie-servidor"]);
});

// RENDER HTML
app.get("/html", (req, res) => {
  res.send("<h1>HOLA</h1><p>Esto es código html</p>");
});

// RENDER HTML CON PARAMETRO URL
app.get("/html/:name", (req, res) => {
  res.send("<h1>HOLA " + req.params.name + " </h1><p>Esto es código html</p>");
});

// RENDER TEMPLATE
app.get("/template", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Example app listening on port " + process.env.PORT || "3000");
});
