module.exports = (sequelize, DataTypes) => {
  var State = sequelize.define('State', {
    json: {
    	type: DataTypes.JSON
    }
  });
  State.associate = function(models) {
    // associations can be defined here
  };
  return State;
};