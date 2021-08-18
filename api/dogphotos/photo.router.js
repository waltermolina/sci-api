const {
  getAllPhotos,
  getAllPhotosByDog,
  getPhotoById,
  createOrUpdatePhoto
} = require("./photo.controller");

const multer = require('multer');

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//const { upload } = require("../../multerupload/upload");

//router.get("/", checkToken, getAllPhotosByDog);
//router.get("/:id", checkToken, getPhotoById);
//router.post(
//  "/", checkToken, multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
//    'photo'
//  ),
//  uploadPhoto
//);
//router.patch("/:id", checkToken, updatePhoto);
//router.delete("/:id", checkToken, deletePhoto);

module.exports = router;
