'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PRPSubjectAttributes', {
      uuid: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 
      },
      subject: {
        type: Sequelize.UUID
      },
      attribute: {
        type: Sequelize.UUID
      },
      text_value: {
        type: Sequelize.TEXT
      },
      string_value: {
        type: Sequelize.STRING
      },
      integer_value: {
        type: Sequelize.INTEGER
      },
      double_value: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('PRPSubjectAttributes');
  }
};