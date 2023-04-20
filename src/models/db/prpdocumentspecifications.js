import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPDocumentSpecifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPDocumentSpecifications.belongsTo(models.PRPDocuments, {
        foreignKey: 'document',
        as: 'document_data'
      });
      PRPDocumentSpecifications.belongsTo(models.PRPAssets, {
        foreignKey: 'asset',
        as: 'asset_data'
      });
      PRPDocumentSpecifications.belongsTo(models.PRPAssetsResources, {
        foreignKey: 'asset_resource',
        as: 'asset_resource_data'
      });
      PRPDocumentSpecifications.belongsTo(models.PRPAssetsMetaDataResources, {
        foreignKey: 'asset_metadata_resource',
        as: 'asset_metadata_resource_data'
      });
      PRPDocumentSpecifications.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });
      PRPDocumentSpecifications.belongsTo(models.PRPBookRecords, {
        foreignKey: 'source_record', //На основании какой ззаписи книги создана позиция спецификации
        as: 'source_record_data'
      });
      PRPDocumentSpecifications.belongsTo(models.PRPDocumentSpecifications, {
        foreignKey: 'control_record', //Ссылка на спецификацию контрольной значения, не запись в книге, а основание регистрации этой записи
        as: 'control_record_data'
      });
    }
  }
  PRPDocumentSpecifications.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    document: DataTypes.UUID,
    asset: DataTypes.UUID,
    asset_resource: DataTypes.UUID,
    asset_metadata_resource: DataTypes.UUID,
    quantity: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    sum: DataTypes.DECIMAL,
    currency: DataTypes.UUID,
    source_record: DataTypes.UUID,
    control_record: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPDocumentSpecifications',
  });
  PRPDocumentSpecifications.beforeCreate(obj => obj.uuid = uuid());
  return PRPDocumentSpecifications;
};