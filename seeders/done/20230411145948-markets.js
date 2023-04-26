'use strict';
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPMarkets', [{
       uuid: uuid(),
       name: 'Токен добра',
       currency: '9ac19c90-0f5f-4dc8-97a7-b6cf77804264',
       locale: '2cd79455-609a-438b-ba52-67d5db8973e4',
       activeMarket:true,
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'Token dobra',
       currency: '50433551-f23b-4fc3-9959-52371ee6bd6e',
       locale: '1630b903-1be0-4cdc-a3a6-cc015abfd254',
       activeMarket:true,
       createdAt: new Date(),
       updatedAt: new Date()
    },
    ]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPMarkets', null, {});
  }
};
