const jwt = require("jsonwebtoken");
const config = require("../config");

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, process.env.SECRET || secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log("decoded", decoded);
    //Check if the id is the same
    if (decoded.id !== owner) {
      throw new Error("You can't do this");
    }
  },
};

function decodeHeader(req) {
  //Authorization: Bearer token
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
}

function getToken(auth) {
  if (!auth) {
    throw new Error("No viene token");
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw new Error("Formato invalido");
  }
  let token = auth.replace("Bearer ", "");

  return token;
}

function verify(token) {
  return jwt.verify(token, process.env.SECRET || secret);
}

module.exports = {
  sign,
  check,
};
