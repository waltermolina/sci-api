const {
  todasLasEmpresas
} = require("./empresa.service");


module.exports = {
  todasLasEmpresas: (req, res) => {
    todasLasEmpresas(req, (err, results) => {
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
  
};
