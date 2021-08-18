const {
  getAllPhonesByPerson,
  getPrimaryPhoneByPerson,
  getPhoneById,
  getPhoneByNumber,
  createPhone,
  updatePhone,
  deletePhone
} = require("./phone.service");

module.exports = {
  getAllPhonesByPerson: (req, res) => {
    getAllPhonesByPerson(req.params.id, (err, results) => {
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

  getPrimaryPhoneByPerson: (req, res) => {
    getPrimaryPhoneByPerson(req.params.id, (err, results) => {
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

  getPhoneById: (req, res) => {
    const id = req.params.id; //get id from url
    getPhoneById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Phone not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getPhoneByNumber: (req, res) => {
    const id = req.params.id; //get id from url
    getPhoneByNumber(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Phone not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  createPhone: (req, res) => {
    const body = req.body;
    createPhone(body, (err, results) => {
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
      });
    });
  },

  updatePhone: (req, res) => {
    const id = req.params.id; //get id from url
    const body = req.body;
    updatePhone(id, body, (err, results) => {
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

  deletePhone: (req, res) => {
    const id = req.params.id; //get id from url
    deletePhone(id, (err, results) => {
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
};
