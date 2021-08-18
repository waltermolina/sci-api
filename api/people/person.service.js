const pool = require("../../config/database");

module.exports = {
  //Get All People
  getAllPeople: (req, callBack) => {
    pool.query(
      `
      SELECT 
          p.idperson,
          p.firstname,
          p.middlename,
          p.lastname,
          p.idtype,
          p.idnumber,
          p.email,
          p.birthdate,
          p.avatar,
          g.idgender,
          g.gendername,
          g.genderdesc,
          g.gendericon
      FROM
          person p
              JOIN
          gender g ON p.gender = g.idgender
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let people = [];
          for (let i = 0; i < results.length; i++) {
            const person = {
              id: results[i].idperson,
              firstname: results[i].firstname,
              middlename: results[i].middlename,
              lastname: results[i].lastname,
              idtype: results[i].idtype,
              idnumber: results[i].idnumber,
              email: results[i].email,
              birthdate: results[i].birthdate,
              gender: {
                id: results[i].idgender,
                name: results[i].gendername,
                description: results[i].genderndesc,
                icon: results[i].gendericon,
              },
              avatar: results[i].avatar
            }
            people.push(person);
          }
          return callBack(null, people);
        }
      });
  },

  //Get person by id
  getPersonById: (id, callBack) => {
    pool.query(
      `
      SELECT 
          p.idperson,
          p.firstname,
          p.middlename,
          p.lastname,
          p.idtype,
          p.idnumber,
          p.email,
          p.birthdate,
          p.avatar,
          g.idgender,
          g.gendername,
          g.genderdesc,
          g.gendericon
      FROM
          person p
              JOIN
          gender g ON p.gender = g.idgender
      WHERE
          idperson = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const person = {
              id: results.idperson,
              firstname: results.firstname,
              middlename: results.middlename,
              lastname: results.lastname,
              idtype: results.idtype,
              idnumber: results.idnumber,
              email: results.email,
              birthdate: results.birthdate,
              gender: {
                id: results.idgender,
                name: results.gendername,
                description: results.genderndesc,
                icon: results.gendericon,
              },
              avatar: results.avatar
            }
            return callBack(null, person);
          } else {
            return callBack(null, []);
          }

        }
      }
    );
  },

  //Get business by identification number
  getPersonByIdNumber: (id, callBack) => {
    pool.query(
      `
      SELECT * FROM person 
      WHERE idnumber = ?;
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null, results);
        }
      }
    );
  },

  createPerson: (data, callBack) => {
    console.log(data);
    pool.query(
      `
      INSERT INTO person(
        firstname,
        middlename,
        lastname,
        gender,
        idtype,
        idnumber,
        birthdate,
        email,
        avatar
      )
      VALUES (?,?,?,?,?,?,?,?, ?);
      `,
      [
        data.firstname,
        data.middlename,
        data.lastname,
        data.gender,
        data.idtype,
        data.idnumber,
        data.birthdate,
        data.email,
        data.avatar
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updatePerson: (id, data, callBack) => {
    pool.query(
      `
        UPDATE person SET
          firstname     = ?,
          middlename    = ?,
          lastname      = ?,
          gender        = ?,
          idtype        = ?,
          idnumber      = ?,
          birthdate     = ?,
          email         = ?,
          avatar        = ?
        WHERE idperson = ?
      `,
      [
        data.firstname,
        data.middlename,
        data.lastname,
        data.gender,
        data.idtype,
        data.idnumber,
        data.birthdate,
        data.email,
        data.avatar,
        id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deletePerson: (id, callBack) => {
    pool.query(
      `
      DELETE FROM person 
      WHERE idperson = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updatePersonAvatar: (data, callBack) => {
    pool.query(
      `
        UPDATE person SET
          avatar     = ?
        WHERE idperson = ?
      `,
      [
        data.avatar,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
