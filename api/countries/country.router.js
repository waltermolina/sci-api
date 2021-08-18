const {
  getAllCountries,
  getCountryById
} = require("./country.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", getAllCountries);
router.get("/:id", checkToken, getCountryById);

module.exports = router;
