module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Transfers', {
      transferRequestId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
       },
      transactionHashId: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Transfers')
  
}




