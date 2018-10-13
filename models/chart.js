'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chart = sequelize.define('Chart', {
    fulfil: DataTypes.STRING
  }, {});
  Chart.associate = function(models) {
    // associations can be defined here
    Chart.belongsTo(models.Course);
    Chart.belongsTo(models.Tool);
    Chart.belongsTo(models.ProgramOutcome);
  };
  return Chart;
};