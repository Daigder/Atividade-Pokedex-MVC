const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Importa o Sequelize instanciado do models/index.js
const { Trainer } = require('./models'); // Importa o modelo Trainer

const app = express();

// Middleware
app.use(bodyParser.json());

// Configura o diretório 'public' como o local para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Testar a conexão com o banco quando o servidor iniciar
sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados com sucesso.'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Rota para registrar um novo treinador
app.post('/trainers', async (req, res) => {
  const { name, age, city, gender, team, pokemons } = req.body;

  try {
    const trainer = await Trainer.create({
      name,
      age,
      city,
      gender,
      team,
      pokemons
    });
    res.status(201).json(trainer); // Retorna o treinador recém-criado
  } catch (error) {
    console.error("Erro ao registrar o treinador:", error);
    res.status(500).json({ error: 'Erro ao inserir treinador' });
  }
});

// Rota para listar todos os treinadores
app.get('/trainers', async (req, res) => {
  try {
    const trainers = await Trainer.findAll();
    res.json(trainers); // Retorna todos os treinadores
  } catch (error) {
    console.error("Erro ao buscar os treinadores:", error);
    res.status(500).json({ error: 'Erro ao buscar treinadores' });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
