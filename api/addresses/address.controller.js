const {
  getAllAddressesByPerson,
  getPrimaryAddressByPerson,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
} = require("./address.service");

module.exports = {
  getAllAddressesByPerson: (req, res) => {
    getAllAddressesByPerson(req.params.id, (err, results) => {
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
  getPrimaryAddressByPerson: (req, res) => {
    getPrimaryAddressByPerson(req.params.id, (err, results) => {
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

  getAddressById: (req, res) => {
    const id = req.params.id; //get id from url
    getAddressById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Address not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  createAddress: (req, res) => {
    const body = req.body;
    createAddress(body, (err, results) => {
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
  updateAddress: (req, res) => {
    const id = req.params.id; //get id from url
    const body = req.body;
    updateAddress(id, body, (err, results) => {
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
  deleteAddress: (req, res) => {
    const id = req.params.id; //get id from url
    deleteAddress(id, (err, results) => {
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
