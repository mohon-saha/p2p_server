module.exports = (sequelize, DataTypes) => {
  const MonthlyGoal = sequelize.define(
    "MonthlyGoal",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      goalName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      goalType: {
        type: DataTypes.ENUM("text", "boolean"),
        allowNull: false,
      },

      goalTextValue: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      goalBooleanValue: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },

      // Month-specific goal date
      goalDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      // Soft delete support
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "monthlyGoal",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return MonthlyGoal;
};

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

module.exports = (sequelize, DataTypes) => {
  const MonthlyGoal = sequelize.define(
    "MonthlyGoal",

    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,

        primaryKey: true,

        autoIncrement: true,
      },

      goalName: {
        type: DataTypes.STRING(255),

        allowNull: false,
      },

      goalType: {
        type: DataTypes.ENUM("text", "boolean"),

        allowNull: false,
      },

      goalTextValue: {
        type: DataTypes.STRING,

        allowNull: true,
      },

      goalBooleanValue: {
        type: DataTypes.BOOLEAN,

        allowNull: true,
      },

      // Month-specific goal date

      goalDate: {
        type: DataTypes.DATEONLY,

        allowNull: false,
      },

      // Soft delete support

      isDeleted: {
        type: DataTypes.BOOLEAN,

        allowNull: false,

        defaultValue: false,
      },
    },

    {
      tableName: "monthlyGoal",

      timestamps: true,

      createdAt: "created_at",

      updatedAt: "updated_at",
    }
  );

  return MonthlyGoal;
};
