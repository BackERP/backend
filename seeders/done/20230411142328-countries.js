'use strict';
const uuid = require('uuid/v4');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPCountries', [{
       uuid: uuid(),
       name: ' Russian Federation',
       alpha2: 'RU',
       alpha3: 'RUS',
       numeric: '643',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    ]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPCountries', null, {});
  }
};
