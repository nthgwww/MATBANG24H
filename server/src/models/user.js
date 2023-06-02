'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' })
      User.belongsTo(models.Role, { foreignKey: 'role', targetKey: 'code', as: 'roles' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    zalo: DataTypes.STRING,
    fbUrl: DataTypes.STRING,
    avatar: DataTypes.BLOB,
    rspasstk: {
      type: DataTypes.STRING,
      set(value) {
        if (!value) {
          this.setDataValue('rspasstk', '')
        } else {
          const hashedToken = crypto.createHash('sha256').update(value).digest('hex')
          this.setDataValue('rspasstk', hashedToken)
        }
      }
    },
    rspassexp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};