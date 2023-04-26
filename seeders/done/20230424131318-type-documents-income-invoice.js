'use strict';

const { v4: uuid } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPTypeDocuments', [{
       uuid: uuid(),
       book: '1173ec15-0403-414d-8ac8-b60b742727eb',
       name: 'income invoice',
       createdAt: new Date(),
       updatedAt: new Date()
    },
   ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPTypeDocuments', null, {});
  }
};
