const {
  todosLosLocales
} = require("./local.service");


module.exports = {
  todosLosLocales: (req, res) => {
    todosLosLocales(req, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  
};
