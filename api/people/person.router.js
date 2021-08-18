const {
  getAllPeople,
  getPersonById,
  getPersonByIdNumber,
  createPerson,
  updatePerson,
  deletePerson,
  updatePersonAvatar
} = require("./person.controller");

const {
  getRegistriesByPerson
} = require("../registries/registry.controller");

const {
  getAllPhonesByPerson,
  getPrimaryPhoneByPerson
} = require("../phones/phone.controller");

const {
  getAllAddressesByPerson,
  getPrimaryAddressByPerson
} = require("../addresses/address.controller");

const multer = require('multer');

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//GET PEOPLE (LIST)
router.get("/", checkToken, getAllPeople);

//GET A PERSON BY ID
router.get("/:id", checkToken, getPersonById);

//GET A PERSON BY ID NUMBER (DNI, NIF...)
router.get("/identification/:id", checkToken, getPersonByIdNumber);


//CREATE PERSON
router.post("/", checkToken, createPerson);

//UPDATE PERSON
router.patch("/:id", checkToken, updatePerson);

//UPDATE PERSON'S AVATAR
router.patch(
  "/:id/avatar", checkToken, multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
    'photo'
  ),
  updatePersonAvatar
);

//DELETE PERSON
router.delete("/:id", checkToken, deletePerson);

//REGISTRIES FOR THIS PERSON
router.get("/:id/registries", checkToken, getRegistriesByPerson);

//PHONES FOR THIS PERSON
router.get("/:id/phones", checkToken, getAllPhonesByPerson);
router.get("/:id/phones/primary", checkToken, getPrimaryPhoneByPerson);

//ADDRESSES FOR THIS PERSON
router.get("/:id/addresses", checkToken, getAllAddressesByPerson);
router.get("/:id/addresses/primary", checkToken, getPrimaryAddressByPerson);


module.exports = router;
