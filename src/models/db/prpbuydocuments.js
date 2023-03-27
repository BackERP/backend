import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPBuyDocuments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPBuyDocuments.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });
      PRPBuyDocuments.belongsTo(models.PRPBuyDocumentStates, {
        foreignKey: 'documentState',
        as: 'documentState_data'
      });


    }
  }
  PRPBuyDocuments.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    number: DataTypes.STRING,
    dateDoc: DataTypes.DATE,
    email: DataTypes.STRING,
    sum: DataTypes.DECIMAL,
    currency: DataTypes.UUID,
    documentState: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPBuyDocuments',
  });
  PRPBuyDocuments.beforeCreate(obj => obj.uuid = uuid());
  return PRPBuyDocuments;
};