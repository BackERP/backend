import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPAssets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPAssets.belongsTo(models.PRPAccounts, {
        foreignKey: 'creater',
        as: 'creater_data'
      });
      PRPAssets.belongsTo(models.PRPSubjectSpecification, {
        foreignKey: 'subject_specification',
        as: 'subject_specification_data'
      });
      PRPAssets.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });



    }
  }
  PRPAssets.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    creater: DataTypes.UUID,
    subject: DataTypes.UUID,
    subject_specification: DataTypes.UUID,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    mime: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPAssets',
  });
  PRPAssets.beforeCreate(obj => obj.uuid = uuid());
  return PRPAssets;
};