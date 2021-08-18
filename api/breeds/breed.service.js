const pool = require("../../config/database");

module.exports = {
  //Get All Breeds
  getAllBreeds: (req, callBack) => {
    pool.query(`
      SELECT 
        idbreed AS 'id', name, "desc"
      FROM
        breed
    `, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },

  //Get breed by id
  getBreedById: (id, callBack) => {
    pool.query(
      `
      SELECT *
      idbreed AS 'id', name, "desc"
      WHERE idbreed = ?
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
