const {
  getAllGenders,
  getGenderById,
} = require("./gender.service");

module.exports = {
  getAllGenders: (req, res) => {
    getAllGenders(req, (err, results) => {
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
  getGenderById: (req, res) => {
    const id = req.params.id; //get id from url
    getGenderById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Gender not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }

};
