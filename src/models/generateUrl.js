const crypto = require("crypto");

function generateURL(length = 8) {
  return crypto.randomBytes(length).toString("base64url");
}

module.exports = generateURL;
