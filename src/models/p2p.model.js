module.exports = (sequelize, DataTypes) => {
  const P2P = sequelize.define(
    "P2P",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      challengeStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      challengeEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      challengeDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isChallengeCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      challengeFailedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      challengeFailedReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      totalSuccessDayCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
    },
    {
      tableName: "p2p",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return P2P;
};
