'use strict';
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPSubjectTypes', [{
       uuid: uuid(),
       name: 'Individual',
       createdAt: new Date(),
       updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('PRPSubjectTypes', [{
       uuid: uuid(),
       name: 'Entity',
       createdAt: new Date(),
       updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('PRPSubjectTypes', [{
       uuid: uuid(),
       name: 'Group',
       createdAt: new Date(),
       updatedAt: new Date()
    }]);



  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPSubjectTypes', null, {});
  }
};
