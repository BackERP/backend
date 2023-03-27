'use strict';
const uuid = require('uuid/v4');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPBuyDocumentStates', [{
       uuid: uuid(),
       name: 'Ordered',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'Paid',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'Canceled',
       createdAt: new Date(),
       updatedAt: new Date()
    }]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPBuyDocumentStates', null, {});
  }
};
