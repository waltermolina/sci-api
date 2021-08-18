const {
  getAllPhonesByPerson,
  getPrimaryPhoneByPerson,
  getPhoneById,
  getPhoneByNumber,
  createPhone,
  updatePhone,
  deletePhone
} = require("./phone.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/byperson/:id", checkToken, getAllPhonesByPerson);
router.get("/byperson/:id/primary", checkToken, getPrimaryPhoneByPerson);
router.get("/:id", checkToken, getPhoneById);
router.get("/number/:id", checkToken, getPhoneByNumber);
router.post("/", checkToken, createPhone);
router.patch("/:id", checkToken, updatePhone);
router.delete("/:id", checkToken, deletePhone);

module.exports = router;
