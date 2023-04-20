'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PRPDocuments', {
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
      subject: {
        type: Sequelize.UUID
      },
      subject_specification: {
        type: Sequelize.UUID
      },
      from_subject: {
        type: Sequelize.UUID
      },
      from_subject_specification: {
        type: Sequelize.UUID
      },
      to_subject: {
        type: Sequelize.UUID
      },
      to_subject_specification: {
        type: Sequelize.UUID
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
      createAccount: {
        type: Sequelize.UUID
      },
      external_number: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('PRPDocuments');
  }
};