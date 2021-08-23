const {
  todosLosDiarios,
  unDiarioid,
  unDiariofechayhora,
  unDiariovalor
} = require("./diario.controller");

const router = require("express").Router();

router.get("/",  todosLosDiarios);
router.get("/", unDiarioid);
router.get("/",  unDiariofechayhora);
router.get("/",  unDiariovalor);


module.exports = router;
