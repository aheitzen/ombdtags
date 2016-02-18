'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    imdbID: DataTypes.STRING,
    year: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.favorite.hasMany(models.comment);
        models.favorite.belongsToMany(models.tag, {through: 'favoritesTags'});
        
      }
    }
  });
  return favorite;
};
