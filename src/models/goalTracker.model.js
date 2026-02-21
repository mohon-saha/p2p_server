module.exports = (sequelize, DataTypes) => {
  const GoalTracker = sequelize.define(
    "GoalTracker",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      goalId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "monthlyGoal", // table name
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      trackingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      trackingValue: {
        type: DataTypes.STRING(255), // flexible for number/text/boolean
        allowNull: true,
      },
    },
    {
      tableName: "goalTracker",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",

      indexes: [
        {
          unique: true,
          fields: ["goalId", "trackingDate"], // prevent duplicate tracking for same date
        },
      ],
    }
  );

  return GoalTracker;
};
