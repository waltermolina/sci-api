const {
  todasLasEmpresas
} = require("./empresa.controller");

const router = require("express").Router();

router.get("/", todasLasEmpresas);


module.exports = router;