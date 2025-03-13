const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";

function encrypt(text, password) {
  var iv = crypto.randomBytes(16);
  var key = crypto.createHash("sha256").update(password).digest();
  var cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  var encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  var authTag = cipher.getAuthTag().toString("hex");
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

function decrypt(encrypted, password) {
  var [ivHex, authTagHex, encryptedText] = encrypted.split(":");
  var iv = Buffer.from(ivHex, "hex");
  var authTag = Buffer.from(authTagHex, "hex");
  var key = crypto.createHash("sha256").update(password).digest();
  var decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  var decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encrypt, decrypt };
