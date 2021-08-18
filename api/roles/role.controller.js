const {
  getAllRoles,
  getRoleById,
} = require("./role.service");

module.exports = {
  getAllRoles: (req, res) => {
    getAllRoles(req, (err, results) => {
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
  getRoleById: (req, res) => {
    const id = req.params.id; //get id from url
    getRoleById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Role not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }

};
