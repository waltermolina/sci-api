const {
  getAllRegistries,
  getRegistriesByDog,
  getRegistryByDog,
  getRegistriesByPerson,
  getRegistryById,
  createRegistry,
  updateRegistry
} = require("./registry.service");

module.exports = {
  getAllRegistries: (req, res) => {
    getAllRegistries(req, (err, results) => {
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

  getRegistriesByDog: (req, res) => {
    const id = req.params.id; //get id from url
    getRegistriesByDog(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Registries not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getRegistryByDog: (req, res) => {
    const id = req.params.id; //get id from url
    getRegistryByDog(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Registry not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getRegistriesByPerson: (req, res) => {
    const id = req.params.id; //get id from url
    getRegistriesByPerson(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Registries not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getRegistryById: (req, res) => {
    const id = req.params.id; //get id from url
    getRegistryById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Registry not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  createRegistry: (req, res) => {
    const body = req.body;
    createRegistry(body, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err.sqlMessage,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Unexpected error!",
        });
      }
      return res.status(201).json({
        success: 1,
        message: "Created successfully",
        data: results
      });
    });
  },
  
  updateRegistry: (req, res) => {
    const id = req.params.id; //get id from url
    const body = req.body;
    updateRegistry(id, body, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err.sqlMessage,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Unexpected error!",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Updated successfully",
      });
    });
  },
};
