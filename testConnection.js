const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pokedex', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
