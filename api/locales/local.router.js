const {
  todosLosLocales, unLocalid, unLocallat, unLocallon, unLocaldir, unLocalcapmax
} = require("./local.controller");

const router = require("express").Router();

router.get("/", todosLosLocales);
router.get("/", unLocalid);
router.get("/", unLocallat);
router.get("/", unLocallon);
router.get("/", unLocalcapmax);


module.exports = router;