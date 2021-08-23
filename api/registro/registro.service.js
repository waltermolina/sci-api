const pool = require("../../config/database");

module.exports = {
  //1. traer todas las empresas de la base
  todosLosRegistros: (req, callBack) => {
    pool.query(
      `
      select * from registro;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let registros = [];
          for (let i = 0; i < results.length; i++) {
            const registro = {
              id: results[i].idregistro,
              fechayhora: results[i].fechahora
            }
            registros.push(registro);
          }
          return callBack(null, registros);
        }
      });
  },

  unRegistroid: (req, callBack) => {
    pool.query(
      `
      select idregistro from registro;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let registros = [];
          const registro = {
            id: results.idregistro,

          }
          registros.push(registro);
          return callBack(null, registros);
        }
      });
  },

  unRegistrofechayhora: (req, callBack) => {
    pool.query(
      `
      select fechahora from registro;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let registros = [];
          const registro = {
            fechayhora: results.fechahora,

          }
          registros.push(registro);
          return callBack(null, registros);
        }
      });
  }

}


