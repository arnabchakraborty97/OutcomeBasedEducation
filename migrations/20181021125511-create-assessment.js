'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      score: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      studentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Students', key: 'id' },
        onDelete: 'CASCADE'
      },
      courseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Courses', key: 'id' },
        onDelete: 'CASCADE'
      },
      programoutcomeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'programoutcomes', key: 'id' },
        onDelete: 'CASCADE'
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
    return queryInterface.dropTable('Assessments');
  }
};