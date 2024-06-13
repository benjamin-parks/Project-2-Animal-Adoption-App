const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employee_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    employee_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employee_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        len: [8],
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
  }
);

module.exports = Employee;