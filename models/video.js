'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Video.init({
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};