'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPBuyDocumentSpecifications', 'resource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t }),
        queryInterface.addColumn('PRPBuyDocumentSpecifications', 'metadataresource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t })

      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPBuyDocumentSpecifications', 'resource', { transaction: t }),
           queryInterface.removeColumn('PRPBuyDocumentSpecifications', 'metadataresource', { transaction: t })
      ]);
   });
  }
};
