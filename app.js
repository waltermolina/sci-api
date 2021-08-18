require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)

const app = express();

const port = process.env.PORT || 3000;


// DB (SERVIDOR A) > API Aplicacion (SERVIDOR B) (SERVICIOS > CONTROLADOR (LOGICA) > RUTAS http://google.com/search?xxxxxxxx > Personas) 

//Routes
const localRouter = require("./api/locales/local.router");

var path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/api", (req, res) => {
  res.json({
    success: 1,
    message: "Hecho para las Olimpiadas",
  });
});

app.use(cors());
app.use(compression());
app.use(express.json());

app.use("/api/locales", localRouter);


//test upload
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/test.html"));
});

app.listen(port, () => {
  console.log(`Server up and running on port ${port}` );
});