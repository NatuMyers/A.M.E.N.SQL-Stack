'use strict';
module.exports = function(sequelize, DataTypes) {
  var Collab = sequelize.define('Collab', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Collab;
};
