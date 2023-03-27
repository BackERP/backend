'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PRPBuyDocuments', {
      uuid: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 
      },
      number: {
        type: Sequelize.STRING
      },
      dateDoc: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.STRING
      },
      sum: {
        type: Sequelize.DECIMAL
      },
      currency: {
        type: Sequelize.UUID
      },
      documentState: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('PRPBuyDocuments');
  }
};