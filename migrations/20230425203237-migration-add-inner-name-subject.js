'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPSubjects', 'inner_name', {
          allowNull: true,
          type: Sequelize.DataTypes.STRING(150),
        }, { transaction: t })
      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {                                      
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPSubjects', 'inner_name', { transaction: t })
      ]);
   });
  }
};
