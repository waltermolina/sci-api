const {
  unaEmpresa,
  todasLasEmpresas
} = require("./empresa.controller");

const router = require("express").Router();

router.get("/", todasLasEmpresas);
router.get("/:id", unaEmpresa);


module.exports = router;