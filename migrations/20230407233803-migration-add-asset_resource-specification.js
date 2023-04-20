
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPDocumentSpecifications', 'asset_resource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t }),
        queryInterface.addColumn('PRPDocumentSpecifications', 'asset_metadata_resource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t })

      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPDocumentSpecifications', 'asset_resource', { transaction: t }),
           queryInterface.removeColumn('PRPDocumentSpecifications', 'asset_metadata_resource', { transaction: t })
      ]);
   });
  }
};
