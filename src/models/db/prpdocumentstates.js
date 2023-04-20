import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPDocumentStates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPDocumentStates.belongsTo(models.PRPTypeDocuments, {
        foreignKey: 'type',
        as: 'type_data'
      });

    }
  }
  PRPDocumentStates.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    name: DataTypes.STRING,
    type: DataTypes.UUID,
    operation: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPDocumentStates',
  });
  PRPDocumentStates.beforeCreate(obj => obj.uuid = uuid());
  return PRPDocumentStates;
};