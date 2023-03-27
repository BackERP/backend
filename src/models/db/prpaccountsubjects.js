'use strict';
import { v4 as uuid } from 'uuid';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPAccountSubjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPAccountSubjects.belongsTo(models.PRPAccounts, {
        foreignKey: 'account',
        as: 'account_data'
      });
      PRPAccountSubjects.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });

    }
  }
  PRPAccountSubjects.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    account: DataTypes.UUID,
    subject: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPAccountSubjects',
  });
  PRPAccountSubjects.beforeCreate(obj => obj.uuid = uuid());
  return PRPAccountSubjects;
};