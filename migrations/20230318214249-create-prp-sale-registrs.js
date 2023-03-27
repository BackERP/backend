'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PRPSaleRegistrs', {
      uuid: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 
      },
      reg_number: {
        type: Sequelize.STRING
      },
      dateReg: {
        type: Sequelize.DATE
      },
      pev_registr: {
        type: Sequelize.UUID
      },
      next_registr: {
        type: Sequelize.UUID
      },
      subject: {
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
      price: {
        type: Sequelize.DECIMAL
      },
      quantity: {
        type: Sequelize.DECIMAL
      },
      sum: {
        type: Sequelize.DECIMAL
      },
      currency: {
        type: Sequelize.UUID
      },
      reg_document: {
        type: Sequelize.UUID
      },
      reg_specification: {
        type: Sequelize.UUID
      },
      base_document: {
        type: Sequelize.UUID
      },
      base_specification: {
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
    await queryInterface.dropTable('PRPSaleRegistrs');
  }
};