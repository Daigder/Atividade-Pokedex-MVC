// controllers/treinadorController.js
const pool = require('../DataBase'); // Importa a configuração do banco

// Função para listar treinadores
const listarTreinadores = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM treinadores');
        const treinadores = result.rows;
        res.render('listaTreinadores', { treinadores });
    } catch (error) {
        console.error('Erro ao listar treinadores:', error);
        res.status(500).send('Erro ao carregar os treinadores');
    }
};

// Função para registrar um treinador
const registrarTreinador = async (req, res) => {
    const { Nome, Idade, Gênero, Equipe, NomePokemon } = req.body;
    const imagem = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        await pool.query(
            'INSERT INTO treinadores (nome, idade, genero, equipe, nome_pokemon, imagem) VALUES ($1, $2, $3, $4, $5, $6)',
            [Nome, Idade, Gênero, Equipe, NomePokemon, imagem]
        );
        res.redirect('/lista-treinadores');
    } catch (error) {
        console.error('Erro ao registrar o treinador:', error);
        res.status(500).send('Erro ao registrar o treinador');
    }
};

module.exports = { listarTreinadores, registrarTreinador };
