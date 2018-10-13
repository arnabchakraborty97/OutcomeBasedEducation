'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProgramOutcome = sequelize.define('ProgramOutcome', {
    name: DataTypes.STRING
  }, {});
  ProgramOutcome.associate = function(models) {
    // associations can be defined here
    ProgramOutcome.hasMany(models.Chart);
  };
  return ProgramOutcome;
};