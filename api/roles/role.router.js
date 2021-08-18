const {
  getAllRoles,
  getRoleById
} = require("./role.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", checkToken, getAllRoles);
router.get("/:id", checkToken, getRoleById);

module.exports = router;
