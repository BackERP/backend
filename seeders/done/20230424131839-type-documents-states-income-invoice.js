'use strict';

const { v4: uuid } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPDocumentStates', [{
       uuid: uuid(),
       type: 'c7f4910e-535a-47c6-8785-eee827eb67cf',
       operation: 0,
       name: 'draft',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: 'c7f4910e-535a-47c6-8785-eee827eb67cf',
       operation: 1,
       name: 'completed',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: 'c7f4910e-535a-47c6-8785-eee827eb67cf',
       operation: -1,
       name: 'cancel',
       createdAt: new Date(),
       updatedAt: new Date()
    },

   ]);
  },
  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPDocumentStates', null, {});
  }
};
