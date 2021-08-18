const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getLoginInfo
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error!",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  getUserById: (req, res) => {
    const id = req.params.id; //get id from url
    getUserById(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error!",
        });
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          message: "Not Found",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    console.log(body, salt);
    createUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error!",
        });
      }
      return res
        .status(201)
        .set("Location", `/api/users/${results.insertid}`)
        .json({
          success: true,
          message: "Created",
          data: results,
        });
    });
  },

  updateUser: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error!",
        });
      }
      if (!results) {
        return res.status(404).json({
          success: false,
          message: "Not Found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Updated",
        data: results,
      });
    });
  },

  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error!",
        });
      }
      if (!results) {
        return res.status(500).json({
          success: false,
          message: "Error!",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Deleted",
        data: results,
      });
    });
  },
  
  login: (req, res) => {
    const body = req.body;
    console.log("body in controller> ", body)
    getLoginInfo(body.username, (err, results) => {
      console.log(err, results);
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      if (!results) {
        return res.status(401).json({
          success: true,
          message: "Invalid username or password",
        });
      } else {
        const result = compareSync(body.password, results.password);

        if (result) {
          //ok! go on
          results.password = undefined; //remove Password
          const jsontoken = sign({ result: results }, "qwe1234", {
            expiresIn: "1h"
          });
          return res.status(200).json({
            success: true,
            message: "Authorized",
            user: results,
            token: jsontoken,
          });
        } else {
          //not authorized
          return res.status(401).json({
            success: true,
            message: "Invalid username or password",
          });
        }
      }
    });
  },
};
