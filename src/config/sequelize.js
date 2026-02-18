const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    pool: { max: 5, min: 0, idle: 10000, acquire: 30000 },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.DailyCompletion = require("../models/dailyCompletion.model")(
  sequelize,
  DataTypes
);

module.exports = db;
