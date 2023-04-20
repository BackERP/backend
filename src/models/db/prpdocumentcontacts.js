import { v4 as uuid } from 'uuid';

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPDocumentContacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPDocumentContacts.belongsTo(models.PRPDocuments, {
        foreignKey: 'document',
        as: 'document_data'
      });
      PRPDocumentContacts.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });
      PRPDocumentContacts.belongsTo(models.PRPSubjectSpecification, {
        foreignKey: 'subject_specification',
        as: 'subject_specification_data'
      });
      PRPDocumentContacts.belongsTo(models.PRPSubjectTypeContacts, {
        foreignKey: 'type',
        as: 'type_data'
      });

    }
  }
  PRPDocumentContacts.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    document: DataTypes.UUID,
    subject: DataTypes.UUID,
    subject_specification: DataTypes.UUID,
    type: DataTypes.UUID,
    contact: DataTypes.TEXT,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPDocumentContacts',
  });
  PRPDocumentContacts.beforeCreate(obj => obj.uuid = uuid());
  return PRPDocumentContacts;
};