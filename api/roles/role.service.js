const pool = require("../../config/database");

module.exports = {
  //Get All Roles
  getAllRoles: (req, callBack) => {
    pool.query(
      `
      SELECT * 
      FROM role
      `,
      [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },

  //Get Role by id
  getRoleById: (id, callBack) => {
    pool.query(
      `
      SELECT *
      FROM role
      WHERE idrole = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          results = results[0];
          return callBack(null, results);
        }
      }
    );
  },

  
};
