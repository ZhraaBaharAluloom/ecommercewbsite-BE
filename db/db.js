const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "poastgres password",
  database: "pasta_shop",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
