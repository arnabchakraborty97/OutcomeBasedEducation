'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assessment = sequelize.define('Assessment', {
    score: DataTypes.DOUBLE
  }, {});
  Assessment.associate = function(models) {
    // associations can be defined here
    Assessment.belongsTo(models.Student, { foreignKey: 'studentId' });
    Assessment.belongsTo(models.Course, { foreignKey: 'courseId' });
    Assessment.belongsTo(models.ProgramOutcome, { foreignKey: 'programoutcomeId' });
  };
  return Assessment;
};