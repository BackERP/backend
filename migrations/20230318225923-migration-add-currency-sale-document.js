'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPSaleDocuments', 'currency', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t })
      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPSaleDocuments', 'currency', { transaction: t })
      ]);
   });
  }
};
