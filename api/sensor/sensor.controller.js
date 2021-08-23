const {
  todosLosSensores,
  todosLosSensoresDeUnLocal,
  unSensor,
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
  unSensor: (req, res) => {
    const id = req.params.id; //get id from url
    unSensor(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Sensor no encontrado",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  todosLosSensoresDeUnLocal: (req, res) => {
    const id = req.params.id; //get id from url
    todosLosSensoresDeUnLocal(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Sensores no encontrados",
        });
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
  

