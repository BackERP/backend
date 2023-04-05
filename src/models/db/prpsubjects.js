import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPSubjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPSubjects.belongsTo(models.PRPAccounts, {
        foreignKey: 'createAccount',
        as: 'createAccount_data'
      });
      PRPSubjects.belongsTo(models.PRPSubjectTypes, {
        foreignKey: 'subject_type',
        as: 'subject_type_data'
      });


    }
  }
  PRPSubjects.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    name: DataTypes.STRING,
    subject_type: DataTypes.STRING,
    show_main: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER,
    createAccount: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPSubjects',
  });
  PRPSubjects.beforeCreate(obj => obj.uuid = uuid());
  return PRPSubjects;
};