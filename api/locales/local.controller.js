const {
  todosLosLocales,
  unLocalid,
  unLocalcapmax, 
  unLocallat,
  unLocallon
} = require("./local.service");


module.exports = {
  todosLosLocales: (req, res) => {
    todosLosLocales(req, (err, results) => {
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
  unLocalid: (req, res) => {
    unLocalid(req, (err, results) => {
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
  unLocallat: (req, res) => {
    unLocallat(req, (err, results) => {
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
  unLocallon: (req, res) => {
    unLocallon(req, (err, results) => {
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
  unLocalcapmax: (req, res) => {
    unLocalcapmax(req, (err, results) => {
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
