const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isAlpha: true
    },
    pet_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pet_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pet_breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    pet_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pet_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'pet',
  }
);


module.exports = Pet;