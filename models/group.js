'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
    Group.belongsTo(models.Course);
    Group.hasMany(models.Tool);
  };
  return Group;
};