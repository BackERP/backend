'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PRPMarketOffers', {
      uuid: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 
      },
      market: {
        type: Sequelize.UUID
      },
      source_offer: {
        type: Sequelize.UUID
      },
      offer: {
        type: Sequelize.UUID
      },
      order: {
        type: Sequelize.INTEGER
      },
      stateMarket: {
        type: Sequelize.INTEGER
      },
      state: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PRPMarketOffers');
  }
};