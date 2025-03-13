const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const Paste = sequelize.define(
  "PASTE",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    encrypted: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  },
);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });

module.exports = Paste;
