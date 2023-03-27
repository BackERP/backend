import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPAssetsMetaDataResources extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPAssetsMetaDataResources.belongsTo(models.PRPAssets, {
        foreignKey: 'asset',
        as: 'asset_data'
      });
      PRPAssetsMetaDataResources.belongsTo(models.PRPAssetsMetaDataProviders, {
        foreignKey: 'provider',
        as: 'provider_data'
      });

    }
  }
  PRPAssetsMetaDataResources.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    asset: DataTypes.UUID,
    provider: DataTypes.UUID,
    resource: DataTypes.TEXT,
    default_item: DataTypes.BOOLEAN,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPAssetsMetaDataResources',
  });
  PRPAssetsMetaDataResources.beforeCreate(obj => obj.uuid = uuid());
  return PRPAssetsMetaDataResources;
};