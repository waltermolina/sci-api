const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("auth");
    if (token) {
      //token = token.slice(7); // remove "bearer "
      verify(token, "qwe1234", (err, decoded) => {
        console.log(err,decoded);
        if (err) {
          res.status(401).json({
            success: false,
            message: "Invalid Token"
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
  }
};