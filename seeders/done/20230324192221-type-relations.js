'use strict';
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPTypeRelations', [{
       uuid: uuid(),
       name: 'Representation',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'Partnership',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'Subordination',
       createdAt: new Date(),
       updatedAt: new Date()
    }]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPTypeRelations', null, {});
  }
};
