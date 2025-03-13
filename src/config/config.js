require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  MAXREQ: process.env.MAXREQ || 5,
  PASTE_MAX_CHARACTERS: process.env.PASTE_MAX_CHARACTERS || 2500,
};
