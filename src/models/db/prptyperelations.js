import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPTypeRelations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PRPTypeRelations.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    name: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPTypeRelations',
  });
  PRPTypeRelations.beforeCreate(obj => obj.uuid = uuid());
  return PRPTypeRelations;
};