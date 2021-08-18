const pool = require("../../config/database");

module.exports = {
  //Get All Countries
  getAllCountries: (req, callBack) => {
    pool.query(`SELECT * FROM country`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },

  //Get country by code
  getCountryById: (id, callBack) => {
    pool.query(
      `
      SELECT *
      FROM country
      WHERE code = ?
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

  
};
