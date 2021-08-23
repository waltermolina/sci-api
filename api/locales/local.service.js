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
  unLocalid: (req, callBack) => {
    pool.query(
      `
      select idlocal from local;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } 
        else {
          let locales = [];
            const local = {
            id: results.idlocal
            }
          locales.push(local);
          return callBack(null, locales);
        }
      });
  },
  unLocallat: (req, callBack) => {
    pool.query(
      `
      select latitud from local;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } 
        else {
          let locales = [];
            const local = {
            lat: results.latitud
            }
          locales.push(local);
          return callBack(null, locales);
        }
      });
  },
  unLocallon: (req, callBack) => {
    pool.query(
      `
      select longitud from local;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } 
        else {
          let locales = [];
            const local = {
            lon: results.longitud
            }
          locales.push(local);
          return callBack(null, locales);
        }
      });
  },
  unLocalcapmax: (req, callBack) => {
    pool.query(
      `
      select capacidadmax from local;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } 
        else {
          let locales = [];
            const local = {
            max: results.capacidadmax
            }
          locales.push(local);
          return callBack(null, locales);
        }
      });
  }

}

