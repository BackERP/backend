'use strict';
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPMarketPlaces', [{
       uuid: uuid(),
       name: 'Токен добра',
       url: 'https://tokendobra.ru/',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'Token dobra',
       url: 'https://tokendobra.com/',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    ]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPMarketPlaces', null, {});
  }
};
