'use strict';
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPMarketsMarketPlaces', [{
       uuid: uuid(),
       marketplace: '6265f078-395b-45ac-be05-29b2f6c8de4e',
       market: 'e946b703-8ba3-41a1-a8d9-c3b07809e455',
       activeMarket:true,
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       marketplace: 'dd24c3ea-ff9e-47e5-a75b-f4a685fda889',
       market: '1c487808-b383-44b1-959c-e840f1f90d09',
       activeMarket:true,
       createdAt: new Date(),
       updatedAt: new Date()
    },
    ]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPMarketsMarketPlaces', null, {});
  }
};
