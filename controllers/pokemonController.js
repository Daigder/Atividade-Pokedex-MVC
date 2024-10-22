const Pokemon = require('../models/pokemon');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage }).single('imagem');

const criarPokemon = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send('Erro ao fazer o upload da imagem.');
    }
    const { nome, tipo, altura, peso, nivelDePoder } = req.body;
    const imagem = req.file ? `/uploads/${req.file.filename}` : null;
    const novoPokemon = new Pokemon(nome, tipo, altura, peso, nivelDePoder, imagem);
    res.render('pokemonView', { pokemon: novoPokemon });
  });
};

module.exports = { criarPokemon };
