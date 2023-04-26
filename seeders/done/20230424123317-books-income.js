'use strict';

//const uuid = require('uuid/v4');
const { v4: uuid } = require('uuid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPBooks', [{
       uuid: uuid(),
       name: 'income',
       createdAt: new Date(),
       updatedAt: new Date()
    },
   ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPBooks', null, {});
  }
};
