const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  var token = req.cookies.token || "";

  if (!token) {
    return res.json({ status: "NotLogged" });
  } else {
    jwt.verify(token, process.env.SECRET, function (err, data) {
      console.log("DATA", data);
      if (err) {
        console.log(err);
        return res.json({ status: "TokenExpired" });
      } else {
        req.userId = data.id;
        req.permission = data.permission;

        next();
      }
    });
  }
}

module.exports = verifyToken;
