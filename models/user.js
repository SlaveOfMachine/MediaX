'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Collection, { as: 'collections' });
      User.hasOne(models.VerificationToken, { as: 'verificationToken', foreignKey: 'userId' } );
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    admin: DataTypes.INTEGER,
    password: DataTypes.STRING,
    emailVerified: DataTypes.BOOLEAN,
    refreshToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
  });
  return User;
};