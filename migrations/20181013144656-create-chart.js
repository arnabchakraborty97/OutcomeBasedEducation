'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Charts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Courses', key: 'id' },
        odDelete: 'CASCADE'
      },
      toolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Tools', key: 'id' },
        odDelete: 'CASCADE'
      },
      programoutcomeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ProgramOutcomes', key: 'id' },
        odDelete: 'CASCADE'
      },
      fulfil: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Charts');
  }
};