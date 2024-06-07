const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    pet_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: 'customer',
        key: 'id',
      },
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