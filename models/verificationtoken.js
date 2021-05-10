'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerificationToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VerificationToken.belongsTo(models.User, {as: 'user'});
    }
  };
  VerificationToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiry: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'VerificationToken',
  });
  return VerificationToken;
};