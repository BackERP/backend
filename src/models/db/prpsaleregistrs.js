import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPSaleRegistrs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPSaleRegistrs.belongsTo(models.PRPSaleRegistrs, {
        foreignKey: 'pev_registr',
        as: 'pev_registr_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPSaleRegistrs, {
        foreignKey: 'next_registr',
        as: 'next_registr_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPAssets, {
        foreignKey: 'asset',
        as: 'asset_data'
      });

      PRPSaleRegistrs.belongsTo(models.PRPAssetsProviders, {
        foreignKey: 'assetProvider',   
        as: 'assetProvider_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPAssetsMetaDataProviders, {
        foreignKey: 'assetMetaDataProvider',
        as: 'assetMetaDataProvider_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPSaleDocuments, {
        foreignKey: 'reg_document',
        as: 'reg_document_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPSaleDocumentSpecifications, {
        foreignKey: 'reg_specification',
        as: 'reg_specification_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPBuyDocuments, {
        foreignKey: 'base_document',
        as: 'base_document_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPBuyDocumentSpecifications, {
        foreignKey: 'base_specification',
        as: 'base_specification_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPAssetsResources, {
        foreignKey: 'resource',
        as: 'resource_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPAssetsMetaDataResources, {
        foreignKey: 'metadataresource',
        as: 'metadataresource_data'
      });
      PRPSaleRegistrs.belongsTo(models.PRPAccounts, {
        foreignKey: 'createAccount',
        as: 'createAccount_data'
      });




    }
  }
  PRPSaleRegistrs.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    reg_number: DataTypes.STRING,
    dateReg: DataTypes.DATE,
    pev_registr: DataTypes.UUID,
    next_registr: DataTypes.UUID,
    subject: DataTypes.UUID,
    asset: DataTypes.UUID,
    assetProvider: DataTypes.UUID,
    assetMetaDataProvider: DataTypes.UUID,
    resource: DataTypes.UUID,
    metadataresource: DataTypes.UUID,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.DECIMAL,
    sum: DataTypes.DECIMAL,
    currency: DataTypes.UUID,
    reg_document: DataTypes.UUID,
    reg_specification: DataTypes.UUID,
    base_document: DataTypes.UUID,
    base_specification: DataTypes.UUID,
    createAccount: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPSaleRegistrs',
  });
  PRPSaleRegistrs.beforeCreate(obj => obj.uuid = uuid());
  return PRPSaleRegistrs;
};