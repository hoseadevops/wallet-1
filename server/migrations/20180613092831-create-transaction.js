module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Transactions', {
      transactionId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      transactionData: {
        type: Sequelize.JSON,
      },
      transactionProcessed: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    }),
  down: (queryInterface, Sequelize) => 
    queryInterface.dropTable('Transactions')
}