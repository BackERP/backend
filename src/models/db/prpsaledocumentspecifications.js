import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPSaleDocumentSpecifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPSaleDocumentSpecifications.belongsTo(models.PRPAssetsResources, {
        foreignKey: 'document',
        as: 'document_data'
      });
      PRPSaleDocumentSpecifications.belongsTo(models.PRPAssets, {
        foreignKey: 'asset',
        as: 'asset_data'
      });

      PRPSaleDocumentSpecifications.belongsTo(models.PRPAssetsProviders, {
        foreignKey: 'assetProvider',
        as: 'assetProvider_data'
      });
      PRPSaleDocumentSpecifications.belongsTo(models.PRPAssetsMetaDataProviders, {
        foreignKey: 'assetMetaDataProvider',
        as: 'assetMetaDataProvider_data'
      });
      PRPSaleDocumentSpecifications.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });

      PRPSaleDocumentSpecifications.belongsTo(models.PRPAssetsResources, {
        foreignKey: 'resource',
        as: 'resource_data'
      });
      PRPSaleDocumentSpecifications.belongsTo(models.PRPAssetsMetaDataResources, {
        foreignKey: 'metadataresource',
        as: 'metadataresource_data'
      });
      PRPSaleDocumentSpecifications.belongsTo(models.PRPAccounts, {
        foreignKey: 'createAccount',
        as: 'createAccount_data'
      });

    }
  }
  PRPSaleDocumentSpecifications.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    document: DataTypes.UUID,
    asset: DataTypes.UUID,
    assetProvider: DataTypes.UUID,
    assetMetaDataProvider: DataTypes.UUID,
    resource: DataTypes.UUID,
    metadataresource: DataTypes.UUID,
    quantity: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    sum: DataTypes.DECIMAL,
    currency: DataTypes.UUID,
    state: DataTypes.INTEGER,
    createAccount: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'PRPSaleDocumentSpecifications',
  });
  PRPSaleDocumentSpecifications.beforeCreate(obj => obj.uuid = uuid());
  return PRPSaleDocumentSpecifications;
};