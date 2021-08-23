const {
  todosLosResponsables,
  unResponsableid,
  unResponsableusuario,
  unResponsablepassword,
  unResponsablemail
} = require("./responsable.service");


module.exports = {
  todosLosResponsables: (req, res) => {
    todosLosResponsables(req, (err, results) => {
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
  unResponsableid: (req, res) => {
    unResponsableid(req, (err, results) => {
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
  unResponsableusuario: (req, res) => {
    unResponsableusuario(req, (err, results) => {
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
  unResponsablepassword: (req, res) => {
    unResponsablepassword(req, (err, results) => {
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
  unResponsablemail: (req, res) => {
    unResponsablemail(req, (err, results) => {
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