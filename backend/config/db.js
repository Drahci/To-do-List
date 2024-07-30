const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("firts_pgdp", "firts_pgdp", "limao123", {
  // Atualize a senha aqui
  host: "127.0.0.1",
  dialect: "postgres",
  port: 5432,
});

module.exports = sequelize;
