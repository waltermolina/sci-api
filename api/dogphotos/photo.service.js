const pool = require("../../config/database");

module.exports = {
  getAllPhotos: (id, callBack) => {
    pool.query(
      `
      SELECT 
          CONCAT(photo.dog, '-', photo.type) AS id,
          photo.dog as dogid,
          dog.name as dogname,
          photo.type,
          photo.url,
          photo.updated,
          phototype.name AS phototypename,
          phototype.desc AS phototypedescription
      FROM
          dogphoto photo
              JOIN
          dogphototype AS phototype ON photo.type = phototype.iddogphototype
              JOIN
          dog AS dog ON photo.dog = dog.iddog;
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null, results);
        }
      });
  },

  //Get Photos from a Dog
  getAllPhotosByDog: (id, callBack) => {
    pool.query(
      `
      SELECT 
        CONCAT(?, '-', phototype.iddogphototype) AS id,
        ? as dogid,
        phototype.iddogphototype as type,
        dogphoto.url,
        dogphoto.updated,
        (select name from dog where iddog = ?) as dogname, -- dogphoto.dogname,
        phototype.name AS phototypename,
        phototype.desc AS phototypedescription
      FROM
        dogphototype phototype
          LEFT JOIN
            (SELECT 
              dog.name AS dogname,
              photo.dog AS dogid,
              photo.type,
              photo.url,
              photo.updated
            FROM
              dogphoto photo
                LEFT JOIN dog AS dog ON photo.dog = dog.iddog
            WHERE
              dog = ?) dogphoto 
          ON phototype.iddogphototype = dogphoto.type
      `,
      [id,parseInt(id),id, id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          
          let photos = [];
          for (let i = 0; i < results.length; i++) {
            const photo = {
              id: results[i].id,
              dog: {
                id: results[i].dogid,
                name: results[i].dogname
              },
              type: {
                id: results[i].type,
                name: results[i].phototypename,
                description: results[i].phototypedescription,
              },
              url: results[i].url,
              updated: results[i].updated
            }
            photos.push(photo);
          }
          return callBack(null, photos);
        }
      });
  },

  //Get photo by id (id is "dog-type")
  getPhotoById: (dogid, phototypeid, callBack) => {
    pool.query(
      `
      SELECT 
        CONCAT(?, '-', phototype.iddogphototype) AS id,
        ? as dogid,
        phototype.iddogphototype as type,
        dogphoto.url,
        dogphoto.updated,
        (select name from dog where iddog = ?) as dogname, -- dogphoto.dogname,
        phototype.name AS phototypename,
        phototype.desc AS phototypedescription
      FROM
        dogphototype phototype
          LEFT JOIN
            (SELECT 
              dog.name AS dogname,
              photo.dog AS dogid,
              photo.type,
              photo.url,
              photo.updated
            FROM
              dogphoto photo
                LEFT JOIN dog AS dog ON photo.dog = dog.iddog
            WHERE
              dog = ?) dogphoto 
          ON phototype.iddogphototype = dogphoto.type
          WHERE phototype.iddogphototype = ?;
      `,
      [dogid, parseInt(dogid), dogid, dogid, phototypeid],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          if (results.length > 0) {
            results = results[0];
            const photo = {
              id: results.id,
              dog: {
                id: results.dogid,
                name: results.dogname
              },
              type: {
                id: results.type,
                name: results.phototypename,
                description: results.phototypedescription,
              },
              url: results.url,
              updated: results.updated
            }
            return callBack(null, photo);
          } else {
            return callBack(null, []);
          }
        }
      }
    );
  },

  createOrUpdatePhoto: (data, callBack) => {
    pool.query(
      `
      INSERT INTO dogphoto (dog, type, url, updated) VALUES (?, ?, ?, (SELECT NOW())) 
      ON DUPLICATE KEY 
      UPDATE url= '${data.url}', updated=(SELECT NOW());
      `,
      [
        data.dog,
        data.type,
        data.url
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
