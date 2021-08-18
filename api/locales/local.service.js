const pool = require("../../config/database");

module.exports = {
  //1. traer todos los locales de la base
  todosLosLocales: (req, callBack) => {
    pool.query(
      `
      SELECT * FROM local;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let locales = [];
          for (let i = 0; i < results.length; i++) {
            const local = {
              id: results[i].idlocal,
              lat: results[i].latitud,
              lon: results[i].longitud,
              max: results[i].capacidadmax
            }
            locales.push(local);
          }
          return callBack(null, locales);
        }
      });
  },

}

