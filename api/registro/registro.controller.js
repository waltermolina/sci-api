const {
  todasLasEmpresas
} = require("./registro.service");


module.exports = {
  todosLosRegistros: (req, res) => {
    todosLosRegistros(req, (err, results) => {
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
  unRegistroid: (req, res) => {
    unRegistroid(req, (err, results) => {
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
  unRegistrofechayhora: (req, res) => {
    unRegistrofechayhora(req, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }
  
};
