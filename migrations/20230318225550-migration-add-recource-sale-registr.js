'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPSaleRegistrs', 'resource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t }),
        queryInterface.addColumn('PRPSaleRegistrs', 'metadataresource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t })

      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPSaleRegistrs', 'resource', { transaction: t }),
           queryInterface.removeColumn('PRPSaleRegistrs', 'metadataresource', { transaction: t })
      ]);
   });
  }
};
