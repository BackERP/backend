import { v4 as uuid } from 'uuid';

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPSubjectContacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPSubjectContacts.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });
      PRPSubjectContacts.belongsTo(models.PRPSubjectTypeContacts, {
        foreignKey: 'type',
        as: 'type_data'
      });


    }
  }
  PRPSubjectContacts.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    subject: DataTypes.UUID,
    type: DataTypes.UUID,
    contact: DataTypes.TEXT,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPSubjectContacts',
  });
  PRPSubjectContacts.beforeCreate(obj => obj.uuid = uuid());
  return PRPSubjectContacts;
};