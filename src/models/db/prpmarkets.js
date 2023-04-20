import { v4 as uuid } from 'uuid';

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPMarkets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPMarkets.belongsTo(models.PRPCurrencies, {
        foreignKey: 'currency',
        as: 'currency_data'
      });
      PRPMarkets.belongsTo(models.PRPLocales, {
        foreignKey: 'locale',
        as: 'locale_data'
      });



    }
  }
  PRPMarkets.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    name: DataTypes.STRING,
    activeMarket: DataTypes.BOOLEAN,
    currency: DataTypes.UUID,
    locale: DataTypes.UUID,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPMarkets',
  });
  PRPMarkets.beforeCreate(obj => obj.uuid = uuid());
  return PRPMarkets;
};