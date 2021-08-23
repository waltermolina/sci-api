const pool = require("../../config/database");

module.exports = {
  //1. traer todas las empresas de la base
  todasLasEmpresas: (req, callBack) => {
    pool.query(
      `
      select * from empresa;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let empresas = [];
          for (let i = 0; i < results.length; i++) {
            const empresa = {
              id: results[i].idempresa,
              cuit: results[i].cuit,
              razonsocial: results[i].razonsocial
            }
            empresas.push(empresa);
          }
          return callBack(null, empresas);
        }
      });
  },
  //Get country by code
  unaEmpresa: (id, callBack) => {
    pool.query(
      `
      SELECT *
      FROM empresa
      WHERE idempresa = ?
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

}

