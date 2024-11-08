'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    static associate(models) {
      // Associações, se houver
    }
  }
  Trainer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pokemons: {
      type: DataTypes.JSONB,
      allowNull: true, // ou false, conforme a necessidade
    }
  }, {
    sequelize,
    modelName: 'Trainer',
    tableName: 'Trainers', // Nome correto da tabela
    timestamps: true,
  });
  return Trainer;
};
