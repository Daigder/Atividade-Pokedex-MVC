'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    static associate(models) {
      // Definir associações, se necessário
    }
  }
  Trainer.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    city: DataTypes.STRING,
    gender: DataTypes.STRING,
    team: DataTypes.STRING,
    pokemons: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Trainer',
    tableName: 'Trainers',
    timestamps: true
  });
  return Trainer;
};
