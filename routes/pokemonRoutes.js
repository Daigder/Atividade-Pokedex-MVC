const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { criarPokemon } = require('../controllers/pokemonController');

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

router.post('/pokemon', upload.single('imagem'), criarPokemon);

module.exports = router;
