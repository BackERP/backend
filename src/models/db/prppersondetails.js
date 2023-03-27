import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPPersonDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPPersonDetails.belongsTo(models.PRPPersons, {
        foreignKey: 'person',
        as: 'person_data'
      });
    }
  }
  PRPPersonDetails.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    person: DataTypes.UUID,
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    description: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPPersonDetails',
  });
  PRPPersonDetails.beforeCreate(obj => obj.uuid = uuid());
  return PRPPersonDetails;
};