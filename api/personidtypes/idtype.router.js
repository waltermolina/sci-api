const {
  getAllIdTypes,
  getIdTypeById
} = require("./idtype.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.get("/", checkToken, getAllIdTypes);
router.get("/:id", checkToken, getIdTypeById);

module.exports = router;
