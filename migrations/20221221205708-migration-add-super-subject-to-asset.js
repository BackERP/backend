'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPAssets', 'subject', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t })
      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPAssets', 'subject', { transaction: t })
      ]);
   });
  }
};

