import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPDocuments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPDocuments.belongsTo(models.PRPTypeDocuments, {
        foreignKey: 'type',
        as: 'type_data'
      });
      PRPDocuments.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });
      PRPDocuments.belongsTo(models.PRPSubjectSpecification, {
        foreignKey: 'subject_specification',
        as: 'subject_specification_data'
      });
      PRPDocuments.belongsTo(models.PRPSubjects, {
        foreignKey: 'from_subject',
        as: 'from_subject_data'
      });
      PRPDocuments.belongsTo(models.PRPSubjectSpecification, {
        foreignKey: 'from_subject_specification',
        as: 'from_subject_specification_data'
      });
      PRPDocuments.belongsTo(models.PRPSubjects, {
        foreignKey: 'to_subject',
        as: 'to_subject_data'
      });
      PRPDocuments.belongsTo(models.PRPSubjectSpecification, {
        foreignKey: 'to_subject_specification',
        as: 'to_subject_specification_data'
      });
      PRPDocuments.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });
      PRPDocuments.belongsTo(models.PRPDocumentStates, {
        foreignKey: 'documentState',
        as: 'documentState_data'
      });
      PRPDocuments.belongsTo(models.PRPAccounts, {
        foreignKey: 'createAccount',
        as: 'createAccount_data'
      });

    }
  }
  PRPDocuments.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    type: DataTypes.UUID,
    number: DataTypes.STRING,
    dateDoc: DataTypes.DATE,
    subject: DataTypes.UUID,
    subject_specification: DataTypes.UUID,
    from_subject: DataTypes.UUID,
    from_subject_specification: DataTypes.UUID,
    to_subject: DataTypes.UUID,
    to_subject_specification: DataTypes.UUID,
    sum: DataTypes.DECIMAL,
    currency: DataTypes.UUID,
    documentState: DataTypes.UUID,
    state: DataTypes.INTEGER,
    createAccount: DataTypes.UUID,
    external_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PRPDocuments',
  });
  PRPDocuments.beforeCreate(obj => obj.uuid = uuid());
  return PRPDocuments;
};