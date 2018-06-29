module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userId:{ 
    	type: DataTypes.STRING,
      allowNull: false,
    },
    userAddress: {
    	type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    privateKey:{
     type: DataTypes.STRING,
      allowNull: false, 
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};