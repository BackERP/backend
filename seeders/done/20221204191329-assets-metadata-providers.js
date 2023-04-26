'use strict';
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPAssetsMetaDataProviders', [{
       uuid: uuid(),
       name: 'PinataIPFS',
       default_item: true,
       createdAt: new Date(),
       updatedAt: new Date()
    }]);

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPAssetsMetaDataProviders', null, {});
  }
};


