const pool = require("../../config/database");

module.exports = {
  //Get All Registries
  getAllRegistries: (req, callBack) => {
    pool.query(
      `
      SELECT 
          r.*,
          o.firstname AS ownerfirstname,
          o.middlename AS ownermiddlename,
          o.lastname AS ownerlastname,
          o.idnumber AS owneridnumber,
          o.email AS owneremail,
          c.firstname AS coownerfirstname,
          c.middlename AS coownermiddlename,
          c.lastname AS coownerlastname,
          c.idnumber AS coowneridnumber,
          c.email AS coowneremail,
          d.code AS dogcode,
          d.name AS dogname,
          d.sex AS dogsex,
          b.name AS breedname
      FROM
          registry r
              LEFT JOIN
          person o ON r.owner = o.idperson
              LEFT JOIN
          person c ON r.coowner = c.idperson
              LEFT JOIN
          dog d ON r.dog = d.iddog
              LEFT JOIN
          breed b ON d.breed = b.idbreed
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          let registries = [];
          for (let i = 0; i < results.length; i++) {
            const registry = {
              idregistry: results[i].idregistry,
              owner: {
                id: results[i].owner,
                firstname: results[i].ownerfirstname,
                middlename: results[i].ownermiddlename,
                lastname: results[i].ownerlastname,
                idnumber: results[i].owneridnumber,
                email: results[i].owneremail
              },
              coowner: {
                id: results[i].coowner,
                firstname: results[i].coownerfirstname,
                middlename: results[i].coownermiddlename,
                lastname: results[i].coownerlastname,
                idnumber: results[i].coowneridnumber,
                email: results[i].coowneremail
              },
              dog: {
                id: results[i].dog,
                code: results[i].dogcode,
                name: results[i].dogname,
                sex: results[i].dogsex,
                breed: results[i].breedname
              },
              date: results[i].date,
            }
            registries.push(registry);
          }
          return callBack(null, registries);
        }
      });
  },

  //Get Registries by Person
  getRegistriesByPerson: (id, callBack) => {
    pool.query(
      `
      SELECT * from registry
      WHERE owner = ${id} 
        OR coowner = ${id}
      `,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null, results);
        }
      }
    );
  },

  //Get Registries by Dog
  getRegistriesByDog: (id, callBack) => {
    pool.query(
      `
      SELECT 
        r.idregistry,
        r.date,
        r.owner as ownerid,
        o.firstname AS ownerfirstname,
        o.middlename AS ownermiddlename,
        o.lastname AS ownerlastname,
        o.idnumber AS owneridnumber,
        o.email AS owneremail,
        r.coowner as coownerid,
        c.firstname AS coownerfirstname,
        c.middlename AS coownermiddlename,
        c.lastname AS coownerlastname,
        c.idnumber AS coowneridnumber,
        c.email AS coowneremail
      FROM registry r
        LEFT JOIN
          person o ON r.owner = o.idperson
        LEFT JOIN
          person c ON r.coowner = c.idperson
      WHERE r.dog = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const registry = {
              id: results.idregistry,
              owner: {
                id: results.ownerid,
                firstname: results.ownerfirstname,
                middlename: results.ownermiddlename,
                lastname: results.ownerlastname,
                idnumber: results.owneridnumber,
                email: results.owneremail
              },
              coowner: {
                id: results.coownerid,
                firstname: results.coownerfirstname,
                middlename: results.coownermiddlename,
                lastname: results.coownerlastname,
                idnumber: results.coowneridnumber,
                email: results.coowneremail
              },
              date: results.date,
            }
            return callBack(null, registry);
          } else {
            return callBack(null, []);
          }
        }
      }
    );
  },

  getRegistryByDog: (id, callBack) => {
    pool.query(
      `
      SELECT 
        r.*,
        o.firstname AS ownerfirstname,
        o.middlename AS ownermiddlename,
        o.lastname AS ownerlastname,
        o.idnumber AS owneridnumber,
        o.email AS owneremail,
        c.firstname AS coownerfirstname,
        c.middlename AS coownermiddlename,
        c.lastname AS coownerlastname,
        c.idnumber AS coowneridnumber,
        c.email AS coowneremail,
        d.code AS dogcode,
        d.name AS dogname,
        d.sex AS dogsex,
        d.birth AS dogbirth,
        d.marks as dogmarks,
        b.idbreed,
        b.name AS breedname,
        b.desc AS breeddesc,
        f.idfur ,
        f.name AS furname,
        f.description AS furdesc,
        ct.code AS countrycode, 
        ct.name AS countryname,
        ct.code2 AS countrycode2
      FROM registry r
        LEFT JOIN
          person o ON r.owner = o.idperson
        LEFT JOIN
          person c ON r.coowner = c.idperson
        LEFT JOIN
          dog d ON r.dog = d.iddog
        LEFT JOIN
          breed b ON d.breed = b.idbreed
        LEFT JOIN
          fur f ON d.fur = f.idfur
        LEFT JOIN
          country ct ON d.country = ct.code
      WHERE r.dog = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const registry = {
              idregistry: results.idregistry,
              owner: {
                id: results.owner,
                firstname: results.ownerfirstname,
                middlename: results.ownermiddlename,
                lastname: results.ownerlastname,
                idnumber: results.owneridnumber,
                email: results.owneremail
              },
              coowner: {
                id: results.coowner,
                firstname: results.coownerfirstname,
                middlename: results.coownermiddlename,
                lastname: results.coownerlastname,
                idnumber: results.coowneridnumber,
                email: results.coowneremail
              },
              dog: {
                id: results.dog,
                code: results.dogcode,
                name: results.dogname,
                sex: results.dogsex,
                birth: results.dogbirth,
                breed: {
                  id: results.idbreed,
                  name: results.breedname,
                  desc: results.breeddesc,
                },
                fur: {
                  id: results.idfur,
                  name: results.furname,
                  desc: results.furdesc,
                },
                marks: results.dogmarks,
                chipnumber: results.dogchipnumber,
                country: {
                  code: results.countrycode,
                  name: results.countryname,
                  code2: results.countrycode2,
                },
                sire: results.dogsire,
                dam: results.dogdam,
              },
              date: results.date,
            }
            return callBack(null, registry);
          } else {
            return callBack(null, []);
          }

        }
      }
    );
  },

  //Get Registries by id
  getRegistryById: (id, callBack) => {
    pool.query(
      `
      SELECT 
        r.*,
        o.firstname AS ownerfirstname,
        o.middlename AS ownermiddlename,
        o.lastname AS ownerlastname,
        o.idnumber AS owneridnumber,
        o.email AS owneremail,
        c.firstname AS coownerfirstname,
        c.middlename AS coownermiddlename,
        c.lastname AS coownerlastname,
        c.idnumber AS coowneridnumber,
        c.email AS coowneremail,
        d.code AS dogcode,
        d.name AS dogname,
        d.sex AS dogsex,
        d.birth AS dogbirth,
        d.marks as dogmarks,
        b.idbreed,
        b.name AS breedname,
        b.desc AS breeddesc,
        f.idfur ,
        f.name AS furname,
        f.description AS furdesc,
        ct.code AS countrycode, 
        ct.name AS countryname,
        ct.code2 AS countrycode2
      FROM registry r
        LEFT JOIN
          person o ON r.owner = o.idperson
        LEFT JOIN
          person c ON r.coowner = c.idperson
        LEFT JOIN
          dog d ON r.dog = d.iddog
        LEFT JOIN
          breed b ON d.breed = b.idbreed
        LEFT JOIN
          fur f ON d.fur = f.idfur
        LEFT JOIN
          country ct ON d.country = ct.code
      WHERE idregistry = ?
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const registry = {
              idregistry: results.idregistry,
              owner: {
                id: results.owner,
                firstname: results.ownerfirstname,
                middlename: results.ownermiddlename,
                lastname: results.ownerlastname,
                idnumber: results.owneridnumber,
                email: results.owneremail
              },
              coowner: {
                id: results.coowner,
                firstname: results.coownerfirstname,
                middlename: results.coownermiddlename,
                lastname: results.coownerlastname,
                idnumber: results.coowneridnumber,
                email: results.coowneremail
              },
              dog: {
                id: results.dog,
                code: results.dogcode,
                name: results.dogname,
                sex: results.dogsex,
                birth: results.dogbirth,
                breed: {
                  id: results.idbreed,
                  name: results.breedname,
                  desc: results.breeddesc,
                },
                fur: {
                  id: results.idfur,
                  name: results.furname,
                  desc: results.furdesc,
                },
                marks: results.dogmarks,
                chipnumber: results.dogchipnumber,
                country: {
                  code: results.countrycode,
                  name: results.countryname,
                  code2: results.countrycode2,
                },
                sire: results.dogsire,
                dam: results.dogdam,
              },
              date: results.date,
            }
            return callBack(null, registry);
          } else {
            return callBack(null, []);
          }

        }
      }
    );
  },

  createRegistry: (data, callBack) => {
    pool.query(
      `
      INSERT INTO registry(
        owner,
        coowner,
        dog,
        date,
        updated
      )
      VALUES (?,?,?,(SELECT NOW()),(SELECT NOW()));
      `,
      [
        data.owner,
        data.coowner,
        data.dog
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateRegistry: (id, data, callBack) => {
    pool.query(
      `
        UPDATE registry SET
          owner         = ?,
          coowner       = ?,
          dog           = ?,
          updated       = (SELECT NOW())
        WHERE idregistry = ?
      `,
      [
        data.owner,
        data.coowner,
        data.dog,
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

};
