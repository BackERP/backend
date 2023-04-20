import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPLocales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPLocales.belongsTo(models.PRPRegions, {
        foreignKey: 'region',
        as: 'region_data'
      });
      PRPLocales.belongsTo(models.PRPLanguages, {
        foreignKey: 'language',
        as: 'language_data'
      });

    }
  }
  PRPLocales.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    name: DataTypes.STRING,
    region: DataTypes.UUID,
    language: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPLocales',
  });
  PRPLocales.beforeCreate(obj => obj.uuid = uuid());

  return PRPLocales;
};