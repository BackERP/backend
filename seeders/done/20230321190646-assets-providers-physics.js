'use strict';

const uuid = require('uuid/v4');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPAssetsProviders', [{
       uuid: uuid(),
       name: 'Physically',
       default_item: false,
       createdAt: new Date(),
       updatedAt: new Date()
    }]);

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPAssetsProviders', null, {});
  }
};
