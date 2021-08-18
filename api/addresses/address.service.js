const pool = require("../../config/database");

module.exports = {
  //Get All Addresses from a Person
  getAllAddressesByPerson: (id, callBack) => {
    pool.query(
      `
      SELECT 
          a.idaddress AS id, 
          a.region,
          a.city,
          a.street,
          a.code,
          a.details,
          a.person,
          a.isprimary,
          a.created,
          a.updated,
          c.name as countryname,
          c.code as countrycode,
          c.code2 as countrycode2
      FROM
          address a
              JOIN
          country c ON a.country = c.code
      WHERE
          a.person = ?
      ORDER BY a.isprimary DESC
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let addresses = [];
          for (let i = 0; i < results.length; i++) {
            const address = {
              id: results[i].id,
              country: {
                name: results[i].countryname,
                code: results[i].countrycode,
                code2: results[i].countrycode2
              },
              region: results[i].region,
              city: results[i].city,
              street: results[i].street,
              code: results[i].code,
              details: results[i].details,
              person: results[i].person,
              isprimary: results[i].isprimary === 1? true : false,
              created: results[i].created,
              updated: results[i].updated
            }
            addresses.push(address);
          }
          return callBack(null, addresses);
        }
      });
  },

  getPrimaryAddressByPerson: (id, callBack) => {
    pool.query(
      `
      SELECT 
          a.idaddress AS id, 
          a.region,
          a.city,
          a.street,
          a.code,
          a.details,
          a.person,
          a.isprimary,
          a.created,
          a.updated,
          c.name as countryname,
          c.code as countrycode,
          c.code2 as countrycode2
      FROM
          address a
              JOIN
          country c ON a.country = c.code
      WHERE
          a.person = ?
          AND a.isprimary = 1
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const address = {
              id: results.id,
              country: {
                name: results.countryname,
                code: results.countrycode,
                code2: results.countrycode2
              },
              region: results.region,
              city: results.city,
              street: results.street,
              code: results.code,
              details: results.details,
              person: results.person,
              isprimary: results.isprimary === 1? true : false,
              created: results.created,
              updated: results.updated
            }
            return callBack(null, address);
          } else {
            return callBack(null, []);
          }
        }
      });
  },

  //Get Address by id
  getAddressById: (id, callBack) => {
    pool.query(
      `
      SELECT 
          a.idaddress AS id, 
          a.region,
          a.city,
          a.street,
          a.code,
          a.details,
          a.person,
          a.isprimary,
          a.created,
          a.updated,
          c.name as countryname,
          c.code as countrycode,
          c.code2 as countrycode2
      FROM
          address a
              JOIN
          country c ON a.country = c.code
      WHERE idaddress = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const address = {
              id: results.id,
              country: {
                name: results.countryname,
                code: results.countrycode,
                code2: results.countrycode2
              },
              region: results.region,
              city: results.city,
              street: results.street,
              code: results.code,
              details: results.details,
              person: results.person,
              isprimary: results.isprimary === 1? true : false,
              created: results.created,
              updated: results.updated
            }
            return callBack(null, address);
          } else {
            return callBack(null, []);
          }
        }
      }
    );
  },

  createAddress: (data, callBack) => {
    pool.query(
      `
      INSERT INTO address(
        country,
        region,
        city,
        street,
        code,
        details,
        person,
        isprimary,
        created,
        updated
      )
      VALUES (?,?,?,?,?,?,?,?,(select now()),(select now()));
      `,
      [
        data.country,
        data.region,
        data.city,
        data.street,
        data.code,
        data.details,
        data.person,
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

  updateAddress: (id, data, callBack) => {
    pool.query(
      `
        UPDATE address SET
          country     = ?,
          region      = ?,
          city        = ?,
          street      = ?,
          code        = ?,
          details     = ?,
          person      = ?,
          isprimary   = ?,
          updated     = (select now())
        WHERE idaddress = ?
      `,
      [
        data.country,
        data.region,
        data.city,
        data.street,
        data.code,
        data.details,
        data.person,
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

  deleteAddress: (id, callBack) => {
    pool.query(
      `
      DELETE FROM address 
      WHERE idaddress = ?
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
    UPDATE address
        SET isprimary = 0
    WHERE 
        person = ?
        AND idaddress <> ?
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


