'use strict';
const uuid = require('uuid/v4');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPLocales', [{
       uuid: uuid(),
       name: 'World',
       region: '410fcfca-413f-4d19-b342-265751e3b5b6',
       language: 'c6798fa2-54e0-4bef-98a6-f2ccc5d9c316',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: ' Russian Federation',
       region: 'd46b438a-57fc-44ea-a563-882ea454755a',
       language: 'ab3cff82-4363-464b-b1eb-8be6e71b1b40',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    ]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPLocales', null, {});
  }
};
