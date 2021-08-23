const pool = require("../../config/database");

module.exports = {
  //1. traer todas las empresas de la base
  todosLosResponsables: (req, callBack) => {
    pool.query(
      `
      select * from responsable;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let responsables = [];
          for (let i = 0; i < results.length; i++) {
            const responsable = {
              idres: results[i].idresponsable,
              usu: results[i].usuario,
              pass: results[i].password,
              mail:results[i].email
            }
            responsables.push(responsable);
          }
          return callBack(null, responsables);
        }
      });
  },

  unResponsableid: (req, callBack) => {
    pool.query(
      `
      select idresponsable from responsable;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let responsables = [];
            const responsable = {
              idres: results.idresponsable
            }
            responsables.push(responsable);
          return callBack(null, responsables);
        }
      });
  },

  unResponsableusuario: (req, callBack) => {
    pool.query(
      `
      select usuario from responsable;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let responsables = [];
            const responsable = {
              usu: results.usuario
            }
            responsables.push(responsable);
          return callBack(null, responsables);
        }
      });
  },
  unResponsablepassword: (req, callBack) => {
    pool.query(
      `
      select password from responsable;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let responsables = [];
            const responsable = {
              pass: results.password
            }
            responsables.push(responsable);
          return callBack(null, responsables);
        }
      });
  },
  unResponsablemail: (req, callBack) => {
    pool.query(
      `
      select email from responsable;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let responsables = [];
            const responsable = {
              mail: results.email
            }
            responsables.push(responsable);
          return callBack(null, responsables);
        }
      });
  }
}
