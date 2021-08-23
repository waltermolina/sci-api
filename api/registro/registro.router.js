const {
  todosLosRegistros,
  unRegistroid,
  unRegistrofechayhora
} = require("./registro.controller");

const router = require("express").Router();

router.get("/", todosLosRegistros);
router.get("/", unRegistroid);
router.get("/", unRegistrofechayhora);

module.exports = router;
