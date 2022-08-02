'use strict';
const { DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rostersItems', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      rosterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'rosters', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      text: {
        type: DataTypes.STRING,
        allowNull:  false
      },
      icon: {
        type: DataTypes.STRING,
      },
      position: {
        type: DataTypes.INTEGER,
        default: 0
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rostersItems');
  }
};
