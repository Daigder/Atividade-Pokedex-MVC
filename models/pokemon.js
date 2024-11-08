'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    static associate(models) {
      // Definir associações aqui, se necessário
    }
  }
  Pokemon.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    level: DataTypes.INTEGER,
    trainerId: DataTypes.INTEGER // Exemplo de campo adicional
  }, {
    sequelize,
    modelName: 'Pokemon',
    tableName: 'Pokemons', // Nome da tabela correspondente no banco de dados
    timestamps: true // Incluir createdAt e updatedAt
  });
  return Pokemon;
};
