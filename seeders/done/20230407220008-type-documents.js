'use strict';

const uuid = require('uuid/v4');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPTypeDocuments', [{
       uuid: uuid(),
       book: 'ea9ffd63-3854-445d-9870-ff086a3849a3',
       name: 'issue',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       book: '8f689d56-2069-4517-83b4-f54139cc7c7a',
       name: 'offer',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       book: '5b5efe30-eecd-4af8-ae0e-f577926b7bf2',
       name: 'order',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       book: '5907e8ea-30c8-4960-9d14-1b7e85ef4d26',
       name: 'paid',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       book: '83e9f88a-10c7-4331-a22a-2c51835cf439',
       name: 'return',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       book: '4f5fb192-54b7-434c-8153-1360a0fd1abe',
       name: 'delivery',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       book: 'b6fdf66b-0c74-4794-97d2-f48655fed55f',
       name: 'mint',
       createdAt: new Date(),
       updatedAt: new Date()
    },
   ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPTypeDocuments', null, {});
  }
};
