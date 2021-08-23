const {
  todasLasEmpresas,
  unaEmpresaid,
  unaEmpresacuit,
  unaEmpresarazonsocial
} = require("./empresa.controller");

const router = require("express").Router();

router.get("/", todasLasEmpresas);
router.get("/", unaEmpresaid);
router.get("/", unaEmpresacuit);
router.get("/", unaEmpresarazonsocial);

module.exports = router;