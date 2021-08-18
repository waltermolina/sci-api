const pool = require("../../config/database");

module.exports = {
  createUser: (data, callBack) => {
    
    pool.query(
      `
      INSERT INTO user (
        person, 
        username, 
        password, 
        created, 
        updated, 
        status, 
        role
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        data.person,
        data.username,
        data.password,
        data.created,
        data.created,
        data.status,
        data.role
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `
      SELECT iduser, person, username, created, updated, status, role 
      FROM user
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserById: (iduser, callBack) => {
    pool.query(
      `
      SELECT iduser, person, username, created, updated, status, role
      FROM user 
      WHERE iduser = ?
      `,
      [iduser],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE user SET
        username = ?, 
        updated = ? , 
        status = ?,
        role = ?
      WHERE iduser = ?`,
      [
        data.username,
        data.updated,
        data.status,
        data.role,
        data.iduser
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM user WHERE iduser = ?`,
      [data.iduser],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  // this method could be a security problem.
  // should be used only when login
  getUserByUsername: (username, callBack) => {
    console.log("username (svc): " + username);
    pool.query(
      `SELECT * FROM user WHERE username = ?`,
      [username],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        //console.log("Results: ", results);
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  getLoginInfo: (username, callBack) => {
    console.log("service: ",username);
    pool.query(
      `
      SELECT 
        u.*, r.*, p.*
      FROM user u
        LEFT JOIN role r on u.role = r.idrole
        LEFT JOIN person p on u.person = p.idperson
      WHERE
        u.username = ?;
      `,
      [username],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log("Results: ", results);
        console.log(results[0]);
        const user = {
          iduser: results[0].iduser,
          username: results[0].username,
          password: results[0].password,
          status: results[0].status,
          role: {
            idrole: results[0].idrole,
            rolename: results[0].rolename
          },
          person: {
            id: results[0].idperson,
            firstname: results[0].firstname,
            middlename: results[0].middlename,
            lastname: results[0].lastname,
            idtype: results[0].idtype,
            idnumber: results[0].idnumber,
            email: results[0].email,
          }
        }
        return callBack(null, user);
      }
    );
  }

};
