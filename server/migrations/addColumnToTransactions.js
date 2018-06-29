module.exports = {
	up : (queryInterface,Sequelize) => {
 			queryInterface.addColumn('Transactions',
        'moved',
        {
          type: Sequelize.BOOLEAN,
        }
      );
  },
   down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Transactions','moved');
   }
};