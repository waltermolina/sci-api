const {
  getAllGenders,
  getGenderById
} = require("./gender.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.get("/", checkToken, getAllGenders);
router.get("/:id", checkToken, getGenderById);

module.exports = router;
