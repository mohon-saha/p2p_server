module.exports = (sequelize, DataTypes) => {
  const TaskStacks = sequelize.define(
    "TaskStacks",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      stackName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stackDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stackStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      stackEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      isStackCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "taskStacks",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return TaskStacks;
};
