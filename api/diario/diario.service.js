const pool = require("../../config/database");

module.exports = {
  todosLosDiarios: (req, callBack) => {
    pool.query(
      `
      SELECT * FROM diario;
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let diarios = [];
          for (let i = 0; i < results.length; i++) {
            const diario = {
              id: results[i].iddiario,
              fechahora: results[i].fechahora,
              valor: results[i].valor,
            }
            diarios.push(diario);
          }
          return callBack(null, diarios);
        }
      });
  },

    //1. traer todos los diarios de la base
    unDiarioid: (req, callBack) => {
      pool.query(
        `
        SELECT iddiario FROM diario;
        `,
        [],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          } else {
            let diarios = [];
              const diario = {
                iddiario: results.iddiario
              }
              diarios.push(diario);
            return callBack(null, diarios);
          }
        });
    },

      //1. traer todas las fechas y horas de la base
      unDiariofechahora: (req, callBack) => {
        pool.query(
          `
          SELECT fechahora FROM diario;
          `,
          [],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            } else {
              let fechayhora = [];
                const fechahora = {
                  fechayhora: results.fechahora
                }
                fechayhora.push(fechahora);
              return callBack(null, fechayhora);
            }
          });
      },
    
      unDiariovalor: (req, callBack) => {
      pool.query(
        `
        SELECT valor FROM diario;
        `,
        [],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          } else {
            let valores = [];
              const valor = {
                valor: results.valor
              }
              valores.push(valor);
            return callBack(null, valores);
          }
        });
    }
      
}

