const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  var token = req.cookies.token || "";

  if (!token) {
    return res.send("Not logged in");
  } else {
    jwt.verify(token, process.env.SECRET, function (err, data) {
      if (err) {
        console.log(err);
        return res.send("Incorrect Token");
      } else {
        req.userId = data.id;
        req.permission = data.permission;

        next();
      }
    });
  }
}

module.exports = verifyToken;
