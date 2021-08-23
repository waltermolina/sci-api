const {
  todosLosResponsables, unResponsableid, unResponsableusuario, unResponsablepassword, unResponsablemail
} = require("./responsable.controller");

const router = require("express").Router();

router.get("/", todosLosResponsables);
router.get("/", unResponsableid);
router.get("/", unResponsableusuario);
router.get("/", unResponsablepassword);
router.get("/", unResponsablemail);


module.exports = router;