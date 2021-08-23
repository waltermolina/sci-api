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

  unaEmpresaid: (req, callBack) => {
    pool.query(
      `
      select idempresa from empresa;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } 
        else {
          let empresas = [];
            const empresa = {
            id: results.idempresa
            }
          empresas.push(empresa);
          return callBack(null, empresas);
        }
      });
  },
  unaEmpresacuit: (req, callBack) => {
    pool.query(
      `
      select cuit from empresa;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } 
        else {
          let empresas = [];
            const empresa = {
            cuit: results.cuit
            }
          empresas.push(empresa);
          return callBack(null, empresas);
        }
      });
  },
  unaEmpresarazonsocial: (req, callBack) => {
    pool.query(
      `
      select razonsocial from empresa;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } 
        else {
          let empresas = [];
            const empresa = {
            razonsocial: results.razonsocial
            }
          empresas.push(empresa);
          return callBack(null, empresas);
        }
      });
  }

}

