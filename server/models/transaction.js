module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    transactionId: {
    	type: DataTypes.STRING,
    	primaryKey: true,
    },
    transactionData: DataTypes.JSON,
    transactionProcessed: DataTypes.BOOLEAN,
    moved : DataTypes.BOOLEAN,
  });
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};