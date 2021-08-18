const pool = require("../../config/database");

module.exports = {
  //Get All 
  getAllIdTypes: (req, callBack) => {
    pool.query(`SELECT * FROM personidtype`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },

  //Get by id
  getIdTypeById: (id, callBack) => {
    pool.query(
      `
      SELECT *
      FROM personidtype
      WHERE idpersonidtype = ?
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
