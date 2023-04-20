'use strict';

const uuid = require('uuid/v4');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPDocumentStates', [{
       uuid: uuid(),
       type: '6b028e9f-0c1a-49e5-bd33-fd517b51e61b',
       operation: 0,
       name: 'draft',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '6b028e9f-0c1a-49e5-bd33-fd517b51e61b',
       operation: 1,
       name: 'completed',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '6b028e9f-0c1a-49e5-bd33-fd517b51e61b',
       operation: -1,
       name: 'cancel',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: 'aebf82ec-ed39-4b70-9e28-47c99b34e159',
       operation: 0,
       name: 'draft',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: 'aebf82ec-ed39-4b70-9e28-47c99b34e159',
       operation: 1,
       name: 'completed',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: 'aebf82ec-ed39-4b70-9e28-47c99b34e159',
       operation: -1,
       name: 'cancel',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '2673f363-bed3-47d0-8097-4e62c0d929af',
       operation: 0,
       name: 'draft',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '2673f363-bed3-47d0-8097-4e62c0d929af',
       operation: 1,
       name: 'completed',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '2673f363-bed3-47d0-8097-4e62c0d929af',
       operation: -1,
       name: 'cancel',
       createdAt: new Date(),
       updatedAt: new Date()
    },

    {
       uuid: uuid(),
       type: '411bf6bf-015d-43a0-8637-a5541348807b',
       operation: 0,
       name: 'draft',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '411bf6bf-015d-43a0-8637-a5541348807b',
       operation: 1,
       name: 'completed',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '411bf6bf-015d-43a0-8637-a5541348807b',
       operation: -1,
       name: 'cancel',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '1ff9492f-4b12-4e78-ba3c-bfaceb2fb261',
       operation: 0,
       name: 'draft',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '1ff9492f-4b12-4e78-ba3c-bfaceb2fb261',
       operation: 1,
       name: 'completed',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '1ff9492f-4b12-4e78-ba3c-bfaceb2fb261',
       operation: -1,
       name: 'cancel',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '79626944-eb38-4290-a554-243640efc901',
       operation: 0,
       name: 'draft',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '79626944-eb38-4290-a554-243640efc901',
       operation: 1,
       name: 'completed',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '79626944-eb38-4290-a554-243640efc901',
       operation: -1,
       name: 'cancel',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '60e9f028-5043-4811-b5df-7c69bfb070dd',
       operation: 0,
       name: 'draft',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '60e9f028-5043-4811-b5df-7c69bfb070dd',
       operation: 1,
       name: 'completed',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       type: '60e9f028-5043-4811-b5df-7c69bfb070dd',
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
