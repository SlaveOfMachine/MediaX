'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Collection.hasMany(models.Video, { as: 'videos' })
    }
  };
  Collection.init({
    slug: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};