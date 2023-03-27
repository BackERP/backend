'use strict';

const uuid = require('uuid/v4');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPAssetsProviders', [{
       uuid: uuid(),
       name: 'PinataIPFS',
       default_item: true,
       createdAt: new Date(),
       updatedAt: new Date()
    }]);

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPAssetsProviders', null, {});
  }
};
