const {
  getAllIdTypes,
  getIdTypeById,
} = require("./idtype.service");

module.exports = {
  getAllIdTypes: (req, res) => {
    getAllIdTypes(req, (err, results) => {
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
  getIdTypeById: (req, res) => {
    const id = req.params.id; //get id from url
    getIdTypeById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "ID Type not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }

};
