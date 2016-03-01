'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    
	userType: DataTypes.STRING,

	email: DataTypes.STRING,
	k: DataTypes.STRING,
	fname: DataTypes.STRING,
	lname: DataTypes.STRING,	
	username: DataTypes.STRING,
	summary: DataTypes.STRING,
	
	messagesSent: DataTypes.INTEGER,
	numCollabs: DataTypes.INTEGER,
	successfulCollabs: DataTypes.INTEGER,
	followers: DataTypes.INTEGER,
	following: DataTypes.INTEGER,
	rating: DataTypes.INTEGER,
	
	isShowingSoc: DataTypes.BOOLEAN,
	isShowingLoc: DataTypes.BOOLEAN,
	isShowingSO: DataTypes.BOOLEAN,
	isSuspended: DataTypes.BOOLEAN,
	isBanned: DataTypes.BOOLEAN,
	isAuth: DataTypes.BOOLEAN,
	dob: DataTypes.BOOLEAN

  }, {
    classMethods: {
      
      // assoc.
      associate: function(models) {
        // associations can be defined here
	User.hasMany(models.Collab);
      }
    
    }

 });

  return User;
};

