const { Sequelize } = require("sequelize");
const config = require("./config");

const dbUrl = config.DATABASE_URL;
if (!dbUrl) {
  throw new Error("DATABASE_URL is not found!");
}

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
    const Paste = require("../models/paste.js");
    await Paste.sync();
    console.log("Syncing database...");
  } catch (e) {
    console.error("Database connection error:", e);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
