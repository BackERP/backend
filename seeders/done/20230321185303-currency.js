'use strict';
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPCurrencies', [{
       uuid: uuid(),
       name: 'Ruble',
       code: 'RUR',
       createdAt: new Date(),
       updatedAt: new Date()
    }]);

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPCurrencies', null, {});
  }
};
