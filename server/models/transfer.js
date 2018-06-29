module.exports = (sequelize, DataTypes) => {
  var Transfer = sequelize.define('Transfer', {
    transferRequestId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    transactionHashId: {
    	type: DataTypes.STRING,
    }
  });
  Transfer.associate = function(models) {
    // associations can be defined here
  };
  return Transfer;
};