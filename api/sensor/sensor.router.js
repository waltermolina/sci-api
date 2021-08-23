const {
  todosLosSensores,
  unSensor,
  todosLoaSensoresDeUnLocal,
  unSensortipo
} = require("./sensor.controller");

const router = require("express").Router();

router.get("/",  todosLosSensores);
router.get("/:id", unSensor);
router.get("/", unSensortipo);
module.exports = router;
