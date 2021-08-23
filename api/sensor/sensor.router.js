const {
  todosLosSensores,
  unSensorid,
  unSensortipo
} = require("./sensor.controller");

const router = require("express").Router();

router.get("/",  todosLosSensores);
router.get("/:id", unSensorid);
router.get("/", unSensortipo);
module.exports = router;
