import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPSubjectTypeAttributes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPSubjectTypeAttributes.belongsTo(models.PRPSubjectTypes, {
        foreignKey: 'type',
        as: 'type_data'
      });
    }
  }
  PRPSubjectTypeAttributes.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    name: DataTypes.STRING,
    type: DataTypes.UUID,
    type_value: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPSubjectTypeAttributes',
  });
  PRPSubjectTypeAttributes.beforeCreate(obj => obj.uuid = uuid());
  return PRPSubjectTypeAttributes;
};