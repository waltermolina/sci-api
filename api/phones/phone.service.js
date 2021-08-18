const pool = require("../../config/database");

module.exports = {
  //Get All Phones from a Person
  getAllPhonesByPerson: (id, callBack) => {
    
    pool.query(
      `
      SELECT 
          p.idphone AS id,
          p.person,
          p.phonenumber AS number,
          p.whatsapp,
          p.isprimary,
          p.created,
          p.updated,
          pt.idphonetype AS typeid,
          pt.description AS typedesc
      FROM
          phone p
              LEFT JOIN
          phonetype pt ON p.type = pt.idphonetype
      WHERE
          p.person = ?
      ORDER BY p.isprimary DESC
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("ERROR! ",error);
          return callBack(error);
        } else {
          let phones = [];
          for (let i = 0; i < results.length; i++) {
            const phone = {
              id: results[i].id,
              person: results[i].person,
              number: results[i].number,
              whatsapp: results[i].whatsapp === 1 ? true : false,
              isprimary: results[i].isprimary === 1 ? true : false,
              type: {
                id: results[i].typeid,
                description: results[i].typedesc
              },
              created: results[i].created,
              updated: results[i].updated
            }
            phones.push(phone);
          }
          return callBack(null, phones);
        }
      });
  },

  //Get Primary Phone from a Person
  getPrimaryPhoneByPerson: (id, callBack) => {
    pool.query(
      `
      SELECT 
          p.idphone AS id,
          p.person,
          p.phonenumber AS number,
          p.whatsapp,
          p.isprimary,
          p.created,
          p.updated,
          pt.idphonetype AS typeid,
          pt.description AS typedesc
      FROM
          phone p
              LEFT JOIN
          phonetype pt ON p.type = pt.idphonetype
      WHERE
          p.person = ?
          AND p.isprimary = 1
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const phone = {
              id: results.id,
              person: results.person,
              number: results.number,
              whatsapp: results.whatsapp === 1 ? true : false,
              isprimary: results.isprimary === 1 ? true : false,
              
              type: {
                id: results.typeid,
                description: results.typedesc
              },
              created: results.created,
              updated: results.updated
            }
            return callBack(null, phone);
          } else {
            return callBack(null, []);
          }

        }
      });
  },

  //Get phone by id
  getPhoneById: (id, callBack) => {
    pool.query(
      `
      SELECT 
          p.idphone AS id,
          p.person,
          p.phonenumber AS number,
          p.whatsapp,
          p.isprimary,
          p.created,
          p.updated,
          pt.idphonetype AS typeid,
          pt.description AS typedesc
      FROM
          phone p
              LEFT JOIN
          phonetype pt ON p.type = pt.idphonetype
      WHERE
          p.idphone = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const phone = {
              id: results.id,
              person: results.person,
              number: results.number,
              whatsapp: results.whatsapp === 1 ? true : false,
              isprimary: results.isprimary === 1 ? true : false,
              type: {
                id: results.typeid,
                description: results.typedesc
              },
              created: results.created,
              updated: results.updated
            }
            return callBack(null, phone);
          } else {
            return callBack(null, []);
          }

        }
      }
    );
  },

  //Get phone by number
  getPhoneByNumber: (id, callBack) => {
    pool.query(
      `
      SELECT 
          p.idphone AS id,
          p.person,
          p.phonenumber AS number,
          p.whatsapp,
          p.isprimary,
          p.created,
          p.updated,
          pt.idphonetype AS typeid,
          pt.description AS typedesc
      FROM
          phone p
              LEFT JOIN
          phonetype pt ON p.type = pt.idphonetype
      WHERE
          p.phonenumber = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const phone = {
              id: results.id,
              person: results.person,
              number: results.number,
              whatsapp: results.whatsapp === 1 ? true : false,
              isprimary: results.isprimary === 1 ? true : false,
              
              type: {
                id: results.typeid,
                description: results.typedesc
              },
              created: results.created,
              updated: results.updated
            }
            return callBack(null, phone);
          } else {
            return callBack(null, []);
          }

        }
      }
    );
  },

  createPhone: (data, callBack) => {
    pool.query(
      `
      INSERT INTO phone(
        person,
        phonenumber,
        whatsapp,
        type,
        isprimary,
        created,
        updated
      )
      VALUES (?,?,?,?,?,(select now()),(select now()));
      `,
      [
        data.person,
        data.phonenumber,
        data.whatsapp,
        data.type,
        data.isprimary
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (data.isprimary === "1" || data.isprimary === 1) {
          removeOtherPrimary({ person: data.person, exception: results.insertId });
        }
        return callBack(null, results);
      }
    );
  },

  updatePhone: (id, data, callBack) => {
    pool.query(
      `
        UPDATE phone SET
          person        = ?,
          phonenumber   = ?,
          whatsapp      = ?,
          type          = ?,
          isprimary     = ?,
          updated       = (select now())
        WHERE idphone   = ?
      `,
      [
        data.person,
        data.phonenumber,
        data.whatsapp,
        data.type,
        data.isprimary,
        id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (data.isprimary === "1" || data.isprimary === 1) {
          removeOtherPrimary({ person: data.person, exception: id });
        }
        return callBack(null, results);
      }
    );
  },

  deletePhone: (id, callBack) => {
    pool.query(
      `
      DELETE FROM phone 
      WHERE idphone = ?
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
};

function removeOtherPrimary(data) {
  pool.query(
    `
    UPDATE phone
        SET isprimary = 0
    WHERE 
        person = ?
        AND idphone <> ?
    `,
    [
      data.person,
      data.exception
    ],
    (error, results, fields) => {
      if (error) {
        return error;
      }
      return results;
    }
  );
}