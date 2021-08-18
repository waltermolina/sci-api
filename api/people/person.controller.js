const {
  getAllPeople,
  getPersonById,
  getPersonByIdNumber,
  createPerson,
  updatePerson,
  deletePerson,
  updatePersonAvatar
} = require("./person.service");


const aws = require('aws-sdk');
const fs = require('fs');

module.exports = {
  getAllPeople: (req, res) => {
    getAllPeople(req, (err, results) => {
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
  getPersonById: (req, res) => {
    const id = req.params.id; //get id from url
    getPersonById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Person not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  createPerson: (req, res) => {
    const body = req.body;
    createPerson(body, (err, results) => {
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
        message: "Created successfully",
        data: results
      });
    });
  },
  updatePerson: (req, res) => {
    const id = req.params.id; //get id from url
    const body = req.body;
    updatePerson(id, body, (err, results) => {
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
      return res.status(200).json({
        success: 1,
        message: "Updated successfully",
      });
    });
  },
  deletePerson: (req, res) => {
    const id = req.params.id; //get id from url
    deletePerson(id, (err, results) => {
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
      return res.status(200).json({
        success: 1,
        message: "Deleted successfully",
      });
    });
  },
  getPersonByIdNumber: (req, res) => {
    const id = req.params.id; //get id from url
    getPersonByIdNumber(id, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: false,
          message: "No results",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },
  updatePersonAvatar: (req, res) => {
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
      Key: `people/${req.body.person}/${req.file.originalname}`
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
        const personPhotoInfo = {
          id: req.body.person, avatar: data.Location
        }
        
        updatePersonAvatar(personPhotoInfo, (err, results) => {
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
            message: "Updated successfully",
            data: {
              id: results.insertId,
              person: personPhotoInfo.id,
              url: data.Location
            }
          });
        });
        
      }
    });
  }
};
