module.exports = (sequelize, DataTypes) => {
  const DailyCompletion = sequelize.define(
    "DailyCompletion",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taskDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "dailyCompletion",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return DailyCompletion;
};
