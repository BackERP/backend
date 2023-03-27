import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPSubjectAttributes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPSubjectAttributes.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });
      PRPSubjectAttributes.belongsTo(models.PRPSubjectTypeAttributes, {
        foreignKey: 'attribute',
        as: 'attribute_data'
      });
    }
  }
  PRPSubjectAttributes.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    subject: DataTypes.UUID,
    attribute: DataTypes.UUID,
    text_value: DataTypes.TEXT,
    string_value: DataTypes.STRING,
    integer_value: DataTypes.INTEGER,
    double_value: DataTypes.DOUBLE,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPSubjectAttributes',
  });
  PRPSubjectAttributes.beforeCreate(obj => obj.uuid = uuid());
  return PRPSubjectAttributes;
};