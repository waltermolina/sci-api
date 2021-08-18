const {
  getAllFurs,
  getFurById
} = require("./fur.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", checkToken, getAllFurs);
router.get("/:id", checkToken, getFurById);

module.exports = router;
