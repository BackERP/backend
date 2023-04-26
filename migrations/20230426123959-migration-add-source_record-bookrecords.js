
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPBookRecords', 'source_record', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t })
      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {                                      
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPBookRecords', 'source_record', { transaction: t })
      ]);
   });
  }
};
