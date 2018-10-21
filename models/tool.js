'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tool = sequelize.define('Tool', {
    name: DataTypes.STRING
  }, {});
  Tool.associate = function(models) {
    // associations can be defined here
    Tool.belongsTo(models.Group, { foreignKey: 'groupId' } );
    Tool.hasMany(models.Chart);
  };
  return Tool;
};