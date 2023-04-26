'use strict';
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPRegions', [{
       uuid: uuid(),
       name: 'World',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: ' Russian Federation',
       country: 'd100f6d8-bbc6-4080-8c73-9b38f1229032',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    ]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPRegions', null, {});
  }
};
