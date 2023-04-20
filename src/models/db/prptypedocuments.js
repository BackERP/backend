import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPTypeDocuments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPTypeDocuments.belongsTo(models.PRPBooks, {
        foreignKey: 'book',
        as: 'book_data'
      });
      PRPTypeDocuments.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });

    }
  }
  PRPTypeDocuments.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    subject: DataTypes.UUID,
    book: DataTypes.UUID,
    name: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPTypeDocuments',
  });
  PRPTypeDocuments.beforeCreate(obj => obj.uuid = uuid());
  return PRPTypeDocuments;
};