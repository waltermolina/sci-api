const {
  getAllBreeds,
  getBreedById,
} = require("./breed.service");

module.exports = {
  getAllBreeds: (req, res) => {
    getAllBreeds(req, (err, results) => {
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
  getBreedById: (req, res) => {
    const id = req.params.id; //get id from url
    getBreedById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Breed not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }

};
