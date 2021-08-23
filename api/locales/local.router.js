const {
  todosLosLocales, unLocalid, unLocallat, unLocallon, unLocaldir, unLocalcapmax
} = require("./local.controller");

const {
  todosLosSensoresDeUnLocal
} = require("../sensor/sensor.controller");

const router = require("express").Router();

router.get("/", todosLosLocales);
//router.get("/:id", unLocalid);
router.get("/:id/sensores", todosLosSensoresDeUnLocal);


module.exports = router;