const pool = require("../../config/database");

module.exports = {
  //Get All Furs
  getAllFurs: (req, callBack) => {
    pool.query(`
      SELECT 
        idfur AS 'id', name, description AS 'desc'
      FROM
        fur
      `, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },

  //Get fur by id
  getFurById: (id, callBack) => {
    pool.query(
      `
      SELECT *
      FROM idfur AS 'id', name, description AS 'desc'
      WHERE idfur = ?
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
