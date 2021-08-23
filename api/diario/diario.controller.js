const {
  todosLosDiarios,
  unDiarioid,
  unDiariofechahora,
  unDiariovalor
} = require("./diario.service");


module.exports = {
  todosLosDiarios: (req, res) => {
    todosLosDiarios(req, (err, results) => {
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
  unDiarioid: (req, res) => {
    unDiarioid(req, (err, results) => {
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

  unDiariofechayhora: (req, res) => {
    unDiariofechayhora(req, (err, results) => {
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
  unDiariovalor: (req, res) => {
    unDiariovalor(req, (err, results) => {
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
