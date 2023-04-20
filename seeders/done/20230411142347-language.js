'use strict';
const uuid = require('uuid/v4');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPLanguages', [{
       uuid: uuid(),
       name: 'Russian',
       short: 'RU',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'English',
       short: 'EN',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    ]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPLanguages', null, {});
  }
};
