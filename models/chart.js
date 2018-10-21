'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chart = sequelize.define('Chart', {
    fulfil: DataTypes.STRING
  }, {});
  Chart.associate = function(models) {
    // associations can be defined here
    Chart.belongsTo(models.Course, { foreignKey: 'courseId' });
    Chart.belongsTo(models.Tool, { foreignKey: 'toolId' });
    Chart.belongsTo(models.ProgramOutcome, { foreignKey: 'programoutcomeId' });
  };
  return Chart;
};