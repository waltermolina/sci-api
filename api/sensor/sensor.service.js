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
            }
            sensores.push(sensor);
          }
          return callBack(null, sensores);
        }
      });
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