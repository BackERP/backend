import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPSaleDocumentStates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PRPSaleDocumentStates.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    name: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPSaleDocumentStates',
  });
  PRPSaleDocumentStates.beforeCreate(obj => obj.uuid = uuid());
  return PRPSaleDocumentStates;
};