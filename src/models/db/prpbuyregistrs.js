import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPBuyRegistrs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPBuyRegistrs.belongsTo(models.PRPAssets, {
        foreignKey: 'asset',
        as: 'asset_data'
      });
      PRPBuyRegistrs.belongsTo(models.PRPAssetsProviders, {
        foreignKey: 'assetProvider',
        as: 'assetProvider_data'
      });
      PRPBuyRegistrs.belongsTo(models.PRPAssetsMetaDataProviders, {
        foreignKey: 'assetMetaDataProvider',
        as: 'assetMetaDataProvider_data'
      });
      PRPBuyRegistrs.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });
      PRPBuyRegistrs.belongsTo(models.PRPBuyDocuments, {
        foreignKey: 'reg_document',
        as: 'reg_document_data'
      });
      PRPBuyRegistrs.belongsTo(models.PRPBuyDocumentSpecifications, {
        foreignKey: 'reg_specification',
        as: 'reg_specification_data'
      });
      PRPBuyRegistrs.belongsTo(models.PRPAssetsResources, {
        foreignKey: 'resource',
        as: 'resource_data'
      });
      PRPBuyRegistrs.belongsTo(models.PRPAssetsMetaDataResources, {
        foreignKey: 'metadataresource',
        as: 'metadataresource_data'
      });


    }
  }
  PRPBuyRegistrs.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    reg_number: DataTypes.STRING,
    dateReg: DataTypes.DATE,
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
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPBuyRegistrs',
  });
  PRPBuyRegistrs.beforeCreate(obj => obj.uuid = uuid());
  return PRPBuyRegistrs;
};