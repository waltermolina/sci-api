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
  unaEmpresaid: (req, res) => {
    unaEmpresaid(req, (err, results) => {
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
  unaEmpresacuit: (req, res) => {
    unaEmpresacuit(req, (err, results) => {
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
  unaEmpresarazonsocial: (req, res) => {
    unaEmpresarazonsocial(req, (err, results) => {
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
