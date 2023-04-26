import { v4 as uuid } from 'uuid';

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPBookRecords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPBookRecords.belongsTo(models.PRPBooks, {
        foreignKey: 'book',
        as: 'book_data'
      });
      PRPBookRecords.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });
      PRPBookRecords.belongsTo(models.PRPSubjectSpecification, {
        foreignKey: 'subject_specification',
        as: 'subject_specification_data'
      });
      PRPBookRecords.belongsTo(models.PRPBookRecords, {
        foreignKey: 'pre_record',
        as: 'pre_record_data'
      });
      PRPBookRecords.belongsTo(models.PRPBookRecords, {
        foreignKey: 'next_record',
        as: 'next_record_data'
      });
      PRPBookRecords.belongsTo(models.PRPAssets, {
        foreignKey: 'asset',
        as: 'asset_data'
      });
      PRPBookRecords.belongsTo(models.PRPAssetsResources, {
        foreignKey: 'asset_resource',
        as: 'asset_resource_data'
      });
      PRPBookRecords.belongsTo(models.PRPAssetsMetaDataResources, {
        foreignKey: 'asset_metadata_resource',
        as: 'asset_metadata_resource_data'
      });
      PRPBookRecords.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });

      PRPBookRecords.belongsTo(models.PRPDocuments, {
        foreignKey: 'reg_document',
        as: 'reg_document_data'
      });
      PRPBookRecords.belongsTo(models.PRPDocumentSpecifications, {
        foreignKey: 'reg_specification',
        as: 'reg_specification_data'
      });

      PRPBookRecords.belongsTo(models.PRPBookRecords, {
        foreignKey: 'base_record',  //основание для перемещения, например в issue, основанием являеся карточка paid
        as: 'base_record_data'
      });
      PRPBookRecords.belongsTo(models.PRPBookRecords, {
        foreignKey: 'source_record',   //Карточка источник
        as: 'source_record_data'
      });


      PRPBookRecords.belongsTo(models.PRPDocumentSpecifications, {
        foreignKey: 'issue_record',
        as: 'issue_record_data'   //Ссылка на спецификацию выпуска, не запись в книге, а основание регистрации этой записи
      });

      PRPBookRecords.belongsTo(models.PRPDocumentSpecifications, {
        foreignKey: 'control_record',
        as: 'control_record_data'  //Ссылка на спецификацию управляющей записи, не запись в книге, а основание регистрации этой записи
      });

      PRPBookRecords.belongsTo(models.PRPBookRecords, {
        foreignKey: 'master_record',
        as: 'master_record_data'  //ссылка на запись в книге, которая изменяет конртоль
      });
    }
  }
  PRPBookRecords.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    book: DataTypes.UUID,
    reg_number: DataTypes.STRING,
    dateReg: DataTypes.DATE,
    subject: DataTypes.UUID,
    subject_specification: DataTypes.UUID,
    pre_record: DataTypes.UUID,
    next_record: DataTypes.UUID,
    asset: DataTypes.UUID,
    asset_resource: DataTypes.UUID,
    asset_metadata_resource: DataTypes.UUID,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.DECIMAL,
    sum: DataTypes.DECIMAL,
    currency: DataTypes.UUID,
    reg_document: DataTypes.UUID,
    reg_specification: DataTypes.UUID,
    base_record: DataTypes.UUID,
    source_record: DataTypes.UUID,
    issue_record: DataTypes.UUID,
    master_record: DataTypes.UUID,
    control_record: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPBookRecords',
  });
  PRPBookRecords.beforeCreate(obj => obj.uuid = uuid());
  return PRPBookRecords;
};