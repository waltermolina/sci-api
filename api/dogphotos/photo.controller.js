const {
  getAllPhotos,
  getAllPhotosByDog,
  getPhotoById,
  createOrUpdatePhoto
} = require("./photo.service");

const aws = require('aws-sdk');
const fs = require('fs');

module.exports = {

  getAllPhotos: (req, res) => {
    getAllPhotos(req, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getAllPhotosByDog: (req, res) => {
    const id = req.params.id; //get id from url
    getAllPhotosByDog(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getPhotoById: (req, res) => {
    const dogid = req.params.dogid; //get dogid from url
    const phototypeid = req.params.phototypeid; //get phototypeid from url
    getPhotoById(dogid, phototypeid, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Dog Photo not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  createOrUpdatePhoto: (req, res) => {
    let fileExt = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'), req.file.originalname.length);
    const body = req.body;
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION
    });
    const s3 = new aws.S3();
    var params = {
      ACL: 'public-read',
      Bucket: process.env.S3_BUCKET_NAME,
      Body: fs.createReadStream(req.file.path),
      Key: `dogs/${req.body.dog}/${req.body.dog}-${req.body.type}${fileExt}`
    };

    s3.upload(params, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err,
        });
      }

      if (data) {
        fs.unlinkSync(req.file.path); // Empty temp folder
        const dogPhotoInfo = {
          ...req.body, url: data.Location
        }
        //console.log(dogPhotoInfo)
        createOrUpdatePhoto(dogPhotoInfo, (err, results) => {
          if (err) {
            return res.status(400).json({
              success: 0,
              message: err.sqlMessage,
            });
          }
          if (!results) {
            return res.status(400).json({
              success: 0,
              message: "Unexpected error!",
            });
          }
          return res.status(201).json({
            success: 1,
            message: "Uploaded successfully",
            data: {
              id: results.insertId,
              url: data.Location
            }
          });
        });
      }
    });
  }

};
