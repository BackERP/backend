import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPPersons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPPersons.belongsTo(models.PRPAccounts, {
        foreignKey: 'createAccount',
        as: 'createAccount_data'
      });

    }
  }
  PRPPersons.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    first_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    createAccount: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPPersons',
  });
  PRPPersons.beforeCreate(obj => obj.uuid = uuid());
  return PRPPersons;
};