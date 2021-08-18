const {
  getAllAddressesByPerson,
  getPrimaryAddressByPerson,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("./address.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/byperson/:id", checkToken, getAllAddressesByPerson);
router.get("/byperson/:id/primary", checkToken, getPrimaryAddressByPerson);
router.get("/:id", checkToken, getAddressById);
router.post("/", checkToken, createAddress);
router.patch("/:id", checkToken, updateAddress);
router.delete("/:id", checkToken, deleteAddress);

module.exports = router;
