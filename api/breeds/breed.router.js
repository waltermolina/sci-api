const {
  getAllBreeds,
  getBreedById
} = require("./breed.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", checkToken, getAllBreeds);
router.get("/:id", checkToken, getBreedById);

module.exports = router;
