'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    roll: DataTypes.STRING,
    batch_of: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsTo(models.Department, { foreignKey: 'departmentId' });
  };
  return Student;
};