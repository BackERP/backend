import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPSaleDocuments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPSaleDocuments.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });

      PRPSaleDocuments.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });
      PRPSaleDocuments.belongsTo(models.PRPSaleDocumentStates, {
        foreignKey: 'documentState',
        as: 'documentState_data'
      });

      PRPSaleDocuments.belongsTo(models.PRPAccounts, {
        foreignKey: 'createAccount',
        as: 'createAccount_data'
      });

    }
  }
  PRPSaleDocuments.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    number: DataTypes.STRING,
    dateDoc: DataTypes.DATE,
    subject: DataTypes.UUID,
    sum: DataTypes.DECIMAL,
    currency: DataTypes.UUID,
    documentState: DataTypes.UUID,
    state: DataTypes.INTEGER,
    createAccount: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'PRPSaleDocuments',
  });
  PRPSaleDocuments.beforeCreate(obj => obj.uuid = uuid());
  return PRPSaleDocuments;
};