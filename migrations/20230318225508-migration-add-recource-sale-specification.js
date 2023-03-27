'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPSaleDocumentSpecifications', 'resource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t }),
        queryInterface.addColumn('PRPSaleDocumentSpecifications', 'metadataresource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t })

      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPSaleDocumentSpecifications', 'resource', { transaction: t }),
           queryInterface.removeColumn('PRPSaleDocumentSpecifications', 'metadataresource', { transaction: t })
      ]);
   });
  }
};
