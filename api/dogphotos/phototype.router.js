const {
  getAllTypes,
  getTypeById
} = require("./phototype.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", checkToken, getAllTypes);
router.get("/:id", checkToken, getTypeById);

module.exports = router;
