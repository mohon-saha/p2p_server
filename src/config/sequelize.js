// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.DATABASE_USERNAME,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     port: process.env.DATABASE_PORT,
//     dialect: "mysql",
//     logging: false,
//     dialectOptions: {
//       ssl: { require: true, rejectUnauthorized: false },
//     },
//     pool: { max: 5, min: 0, idle: 10000, acquire: 30000 },
//   }
// );

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Load models
// db.DailyCompletion = require("../models/dailyCompletion.model")(
//   sequelize,
//   DataTypes
// );
// db.TimeEntry = require("../models/TimeEntry")(sequelize, DataTypes);
// db.TaskCategory = require("../models/taskCategory.model")(sequelize, DataTypes);

// db.MonthlyGoal = require("../models/monthlyGoal.model")(sequelize, DataTypes);

// db.GoalTracker = require("../models/goalTracker.model")(sequelize, DataTypes);

// module.exports = db;

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

// ------------------- Load models ------------------- //
db.DailyCompletion = require("../models/dailyCompletion.model")(
  sequelize,
  DataTypes
);
db.TimeEntry = require("../models/TimeEntry")(sequelize, DataTypes);
db.TaskCategory = require("../models/taskCategory.model")(sequelize, DataTypes);

db.MonthlyGoal = require("../models/monthlyGoal.model")(sequelize, DataTypes);
db.GoalTracker = require("../models/goalTracker.model")(sequelize, DataTypes);

// ------------------- Associations ------------------- //
// A MonthlyGoal has many GoalTracker entries
db.MonthlyGoal.hasMany(db.GoalTracker, {
  foreignKey: "goalId",
  as: "trackerData", // this is the alias used in your queries
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A GoalTracker belongs to a MonthlyGoal
db.GoalTracker.belongsTo(db.MonthlyGoal, {
  foreignKey: "goalId",
  as: "goal",
});

module.exports = db;
