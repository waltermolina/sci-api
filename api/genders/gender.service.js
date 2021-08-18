const pool = require("../../config/database");

module.exports = {
  //Get All Genders
  getAllGenders: (req, callBack) => {
    pool.query(`
      SELECT
        idgender as id,
        gendername as name,
        genderdesc as description,
        gendericon as icon
      FROM gender`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },

  //Get Gender by id
  getGenderById: (id, callBack) => {
    pool.query(
      `
      SELECT 
        idgender as id,
        gendername as name,
        genderdesc as description,
        gendericon as icon
      FROM gender
      WHERE idgender = ?
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
