import { v4 as uuid } from 'uuid';
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PRPBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRPBooks.belongsTo(models.PRPSubjects, {
        foreignKey: 'subject',
        as: 'subject_data'
      });

    }
  }
  PRPBooks.init({
    uuid: {
            type: DataTypes.UUID,
            primaryKey:true
          },
    subject: DataTypes.UUID,
    name: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PRPBooks',
  });
  PRPBooks.beforeCreate(obj => obj.uuid = uuid());
  return PRPBooks;
};