'use strict';

const { v4: uuid } = require('uuid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPAssetsProviders', [{
       uuid: uuid(),
       name: 'Local',
       default_item: false,
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'External link',
       default_item: false,
       createdAt: new Date(),
       updatedAt: new Date()
    }
   ]);

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPAssetsProviders', null, {});
  }
};
