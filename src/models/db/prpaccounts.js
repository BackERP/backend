import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPAccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PRPAccounts.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    login: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPAccounts',
  });
  PRPAccounts.beforeCreate(obj => obj.uuid = uuid());
  return PRPAccounts;
};