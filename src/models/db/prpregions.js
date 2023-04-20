import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPRegions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPRegions.belongsTo(models.PRPRegions, {
        foreignKey: 'parent',
        as: 'parent_data'
      });
      PRPRegions.belongsTo(models.PRPCountries, {
        foreignKey: 'country',
        as: 'country_data'
      });

    }
  }
  PRPRegions.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    name: DataTypes.STRING,
    country: DataTypes.UUID,
    parent: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPRegions',
  });
  PRPRegions.beforeCreate(obj => obj.uuid = uuid());

  return PRPRegions;
};