import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPSubjectSpecification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPSubjectSpecification.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });
      PRPSubjectSpecification.belongsTo(models.PRPSubjects, {
        foreignKey: 'subsubject',
        as: 'subsubject_data'
      });
      PRPSubjectSpecification.belongsTo(models.PRPPersons, {
        foreignKey: 'person',
        as: 'person_data'
      });
      PRPSubjectSpecification.belongsTo(models.PRPAccounts, {
        foreignKey: 'createAccount',
        as: 'createAccount_data'
      });
      PRPSubjectSpecification.belongsTo(models.PRPTypeRelations, {
        foreignKey: 'relation',
        as: 'relation_data'
      });




    }
  }
  PRPSubjectSpecification.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    subject: DataTypes.UUID,
    subsubject: DataTypes.UUID,
    person: DataTypes.UUID,
    relation: DataTypes.UUID,
    description: DataTypes.TEXT,
    state: DataTypes.INTEGER,
    createAccount: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'PRPSubjectSpecification',
  });
  PRPSubjectSpecification.beforeCreate(obj => obj.uuid = uuid());
  return PRPSubjectSpecification;
};