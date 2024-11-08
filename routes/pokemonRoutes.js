const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importando o módulo fs
const { criarPokemon } = require('../controllers/pokemonController');

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Rota para a página de lista de treinadores
router.get('/lista-treinadores', (req, res) => {
    // Carrega o arquivo JSON com os dados dos treinadores
    const treinadoresPath = path.join(__dirname, '..', 'data', 'treinadores.json');
    fs.readFile(treinadoresPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de treinadores:', err);
            return res.status(500).send('Erro ao carregar os treinadores');
        }

        // Converte os dados JSON para um array de objetos
        const treinadores = JSON.parse(data);

        // Renderiza a página "listaTreinadores.html" passando os dados
        res.render('listaTreinadores', { treinadores });
    });
});

// Rota para criar um Pokémon
router.post('/pokemon', upload.single('imagem'), criarPokemon);

// Rota para registro do treinador
router.post('/Treinador', upload.single('imagem'), (req, res) => {
    // Recupera os dados do treinador do formulário
    const novoTreinador = {
        nome: req.body.Nome,
        idade: req.body.Idade,
        genero: req.body.Gênero,
        equipe: req.body.Equipe,
        nomePokemon: req.body.NomePokemon,
        imagem: req.file ? `/uploads/${req.file.filename}` : null // Caminho da imagem
    };

    // Caminho para o arquivo JSON dos treinadores
    const treinadoresPath = path.join(__dirname, '..', 'data', 'treinadores.json');

    // Lê o arquivo JSON e adiciona o novo treinador
    fs.readFile(treinadoresPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de treinadores:', err);
            return res.status(500).send('Erro ao registrar o treinador');
        }

        const treinadores = JSON.parse(data);
        treinadores.push(novoTreinador); // Adiciona o novo treinador ao array

        // Salva o array atualizado no JSON
        fs.writeFile(treinadoresPath, JSON.stringify(treinadores, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar o novo treinador:', err);
                return res.status(500).send('Erro ao registrar o treinador');
            }

            // Redireciona para a página de lista de treinadores após o registro
            res.redirect('/lista-treinadores');
        });
    });
});

module.exports = router;
