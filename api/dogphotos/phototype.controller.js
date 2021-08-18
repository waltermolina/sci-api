const {
  getAllTypes,
  getTypeById,
} = require("./phototype.service");

module.exports = {
  getAllTypes: (req, res) => {
    getAllTypes(req, (err, results) => {
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
  getTypeById: (req, res) => {
    const id = req.params.id; //get id from url
    getTypeById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Dog Photo Type not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }

};
