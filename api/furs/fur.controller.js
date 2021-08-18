const {
  getAllFurs,
  getFurById,
} = require("./fur.service");

module.exports = {
  getAllFurs: (req, res) => {
    getAllFurs(req, (err, results) => {
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
  getFurById: (req, res) => {
    const id = req.params.id; //get id from url
    getFurById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Fur not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }

};
