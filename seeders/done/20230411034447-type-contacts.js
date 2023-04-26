'use strict';
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('PRPSubjectTypeContacts', [{
       uuid: uuid(),
       name: 'Phone',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'Email',
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
       uuid: uuid(),
       name: 'Site',
       createdAt: new Date(),
       updatedAt: new Date()
    }]);

  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('PRPSubjectTypeContacts', null, {});
  }
};
