const pool = require("../../config/database");

module.exports = {
  //1. traer todos los sensores de la base
  todosLosSensores: (req, callBack) => {
    pool.query(
      `
      SELECT * FROM sensor;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let sensores = [];
          for (let i = 0; i < results.length; i++) {
            const sensor = {
              id: results[i].idsensor,
              tipo: results[i].tipo,
              local: results[i].idlocal,
            }
            sensores.push(sensor);
          }
          return callBack(null, sensores);
        }
      });
  },

  //Trae 1 sensor por id
  unSensor: (id, callBack) => {
    pool.query(
      `
      SELECT *
      FROM sensor
      WHERE idsensor = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          results = results[0] || [];
          return callBack(null, results);
        }
      }
    );
  },

  //Trae todos los sensores de un local
  todosLosSensoresDeUnLocal: (id, callBack) => {
    pool.query(
      `
      SELECT *
      FROM sensor
      JOIN local ON local.idlocal = sensor.local_idlocal
      WHERE local.idlocal = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          //results = results || [];
          return callBack(null, results);
        }
      }
    );
  },

  //1. traer todos los tipo de la base
  unIdSensor: (req, callBack) => {
    pool.query(
      `
    SELECT idsensor FROM sensor;
    `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let sensores = [];
          const sensor = {
            id: results.idsensor,
          }
          sensores.push(sensor);
          return callBack(null, sensores);
        }
      });
  },

  unSensortipo: (req, callBack) => {
    pool.query(
      `
    SELECT tipo FROM sensor;
    `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let sensores = [];
          const sensor = {
            tipo: results.tipo,
          }
          sensores.push(sensor);
          return callBack(null, sensores);
        }
      });
  }

}