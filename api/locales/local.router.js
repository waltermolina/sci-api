const {
  todosLosLocales
} = require("./local.controller");

const router = require("express").Router();

router.get("/", todosLosLocales);


module.exports = router;