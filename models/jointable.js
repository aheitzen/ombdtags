'use strict';
module.exports = function(sequelize, DataTypes) {
  var joinTable = sequelize.define('joinTable', {
    tagId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.joinTable.belongsTo(models.tag);
         models.joinTable.belongsTo(models.favorite);
      }
    }
  });
  return joinTable;
};