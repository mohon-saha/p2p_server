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
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "taskCategory",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
    },
    {
      tableName: "dailyCompletion",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  DailyCompletion.associate = (models) => {
    DailyCompletion.belongsTo(models.TaskCategory, {
      foreignKey: "categoryId",
      as: "category",
    });
  };

  return DailyCompletion;
};
