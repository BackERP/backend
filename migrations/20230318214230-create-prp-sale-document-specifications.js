'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PRPSaleDocumentSpecifications', {
      uuid: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 
      },
      document: {
        type: Sequelize.UUID
      },
      asset: {
        type: Sequelize.UUID
      },
      assetProvider: {
        type: Sequelize.UUID
      },
      assetMetaDataProvider: {
        type: Sequelize.UUID
      },
      quantity: {
        type: Sequelize.DECIMAL
      },
      price: {
        type: Sequelize.DECIMAL
      },
      sum: {
        type: Sequelize.DECIMAL
      },
      currency: {
        type: Sequelize.UUID
      },
      state: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createAccount: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('PRPSaleDocumentSpecifications');
  }
};