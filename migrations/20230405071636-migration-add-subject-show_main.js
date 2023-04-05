'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPSubjects', 'show_main', {
          allowNull: true,
          type: Sequelize.DataTypes.BOOLEAN,
        }, { transaction: t })
      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPSubjects', 'show_main', { transaction: t })
      ]);
   });
  }
};
