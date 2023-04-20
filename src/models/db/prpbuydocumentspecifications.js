import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPBuyDocumentSpecifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPBuyDocumentSpecifications.belongsTo(models.PRPBuyDocuments, {
        foreignKey: 'document',
        as: 'document_data'
      });
      PRPBuyDocumentSpecifications.belongsTo(models.PRPAssets, {
        foreignKey: 'asset',
        as: 'asset_data'
      });

      PRPBuyDocumentSpecifications.belongsTo(models.PRPAssetsProviders, {
        foreignKey: 'assetProvider',
        as: 'assetProvider_data'
      });
      PRPBuyDocumentSpecifications.belongsTo(models.PRPAssetsMetaDataProviders, {
        foreignKey: 'assetMetaDataProvider',
        as: 'assetMetaDataProvider_data'
      });
      PRPBuyDocumentSpecifications.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });

      PRPBuyDocumentSpecifications.belongsTo(models.PRPAssetsResources, {
        foreignKey: 'resource',
        as: 'resource_data'
      });
      PRPBuyDocumentSpecifications.belongsTo(models.PRPAssetsMetaDataResources, {
        foreignKey: 'metadataresource',
        as: 'metadataresource_data'
      });
      PRPBuyDocumentSpecifications.belongsTo(models.PRPSaleRegistrs, {
        foreignKey: 'source_registr',
        as: 'source_registr_data'
      });

    }
  }
  PRPBuyDocumentSpecifications.init({
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
    source_registr: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPBuyDocumentSpecifications',
  });
  PRPBuyDocumentSpecifications.beforeCreate(obj => obj.uuid = uuid());
  return PRPBuyDocumentSpecifications;
};