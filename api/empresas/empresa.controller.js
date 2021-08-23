const {
  unaEmpresa,
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

  unaEmpresa: (req, res) => {
    const id = req.params.id; 
    unaEmpresa(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Empresa no encontrada",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }

  
};
