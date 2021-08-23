const {
  todosLosSensores,
  unSensorid,
  unSensortipo
} = require("./sensor.service");


module.exports = {
  todosLosSensores: (req, res) => {
    todosLosSensores(req, (err, results) => {
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
  unSensortipo: (req, res) => {
    unSensortipo(req, (err, results) => {
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

  unSensorid: (req, res) => {
    unSensorid(req, (err, results) => {
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
  

