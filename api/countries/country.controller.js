const {
  getAllCountries,
  getCountryById,
} = require("./country.service");

module.exports = {
  getAllCountries: (req, res) => {
    getAllCountries(req, (err, results) => {
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
  getCountryById: (req, res) => {
    const id = req.params.id; //get id from url
    getCountryById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Country not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }

};
