import { v4 as uuid } from 'uuid';

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPMarketsMarketPlaces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPMarketsMarketPlaces.belongsTo(models.PRPMarketPlaces, {
        foreignKey: 'marketplace',
        as: 'marketplace_data'
      });
      PRPMarketsMarketPlaces.belongsTo(models.PRPMarkets, {
        foreignKey: 'market',
        as: 'market_data'
      });

    }
  }
  PRPMarketsMarketPlaces.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    marketplace: DataTypes.UUID,
    market: DataTypes.UUID,
    activeMarket: DataTypes.BOOLEAN,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPMarketsMarketPlaces',
  });
  PRPMarketsMarketPlaces.beforeCreate(obj => obj.uuid = uuid());
  return PRPMarketsMarketPlaces;
};