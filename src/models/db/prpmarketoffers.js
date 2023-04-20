import { v4 as uuid } from 'uuid';

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPMarketOffers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPMarketOffers.belongsTo(models.PRPMarkets, {
        foreignKey: 'market',
        as: 'market_data'
      });
      PRPMarketOffers.belongsTo(models.PRPDocuments, {
        foreignKey: 'source_offer',
        as: 'source_offer_data'
      });

      PRPMarketOffers.belongsTo(models.PRPDocuments, {
        foreignKey: 'offer',
        as: 'offer_data'
      });

    }
  }
  PRPMarketOffers.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    market: DataTypes.UUID,
    source_offer: DataTypes.UUID,
    offer: DataTypes.UUID,
    order: DataTypes.INTEGER,
    stateMarket: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPMarketOffers',
  });
  PRPMarketOffers.beforeCreate(obj => obj.uuid = uuid());
  return PRPMarketOffers;
};