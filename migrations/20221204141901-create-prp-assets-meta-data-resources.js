'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PRPAssetsMetaDataResources', {
      uuid: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 
      },
      asset: {
        type: Sequelize.UUID
      },
      provider: {
        type: Sequelize.UUID
      },
      resource: {
        type: Sequelize.TEXT
      },
      default_item: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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
    await queryInterface.dropTable('PRPAssetsMetaDataResources');
  }
};