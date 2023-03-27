import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPPersonAccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPPersonAccounts.belongsTo(models.PRPPersons, {
        foreignKey: 'person',
        as: 'person_data'
      });
      PRPPersonAccounts.belongsTo(models.PRPAccounts, {
        foreignKey: 'account',
        as: 'account_data'
      });

    }
  }
  PRPPersonAccounts.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    person: DataTypes.UUID,
    account: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPPersonAccounts',
  });
  PRPPersonAccounts.beforeCreate(obj => obj.uuid = uuid());
  return PRPPersonAccounts;
};