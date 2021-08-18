const pool = require("../../config/database");

module.exports = {
  //Get All Types
  getAllTypes: (req, callBack) => {
    pool.query(`SELECT * FROM type`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },

  //Get type by id
  getTypeById: (id, callBack) => {
    pool.query(
      `
      SELECT *
      FROM type
      WHERE iddogphototype = ?
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
