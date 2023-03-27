'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
        queryInterface.addColumn('PRPBuyRegistrs', 'resource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t }),
        queryInterface.addColumn('PRPBuyRegistrs', 'metadataresource', {
          allowNull: true,
          type: Sequelize.DataTypes.UUID,
        }, { transaction: t })

      ]);
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
       return Promise.all([
           queryInterface.removeColumn('PRPBuyRegistrs', 'resource', { transaction: t }),
           queryInterface.removeColumn('PRPBuyRegistrs', 'metadataresource', { transaction: t })
      ]);
   });
  }
};
