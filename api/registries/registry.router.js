const {
  getAllRegistries,
  getRegistryById,
  createRegistry,
  updateRegistry
} = require("./registry.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

// router.get("/", getAllRegistries);
router.get("/:id", getRegistryById);
router.post("/", createRegistry);
router.patch("/:id",  updateRegistry);


router.get("/", checkToken, getAllRegistries);
// router.get("/:id", checkToken, getRegistryById);
// router.post("/", checkToken, createRegistry);
// router.patch("/:id", checkToken, updateRegistry);
// router.delete("/:id", checkToken, deleteAddress);

// INFO >
// getRegistriesByDog is in Dog Router
// getRegistriesByPerson is in Person Router

module.exports = router;