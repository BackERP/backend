'use strict';
const uuid = require('uuid/v4');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPSaleDocumentStates', [{
       uuid: uuid(),
       name: 'Вraft',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'Done',
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
     await queryInterface.bulkDelete('PRPSaleDocumentStates', null, {});
  }
};
