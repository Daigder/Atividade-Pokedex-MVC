const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { listarTreinadores, registrarTreinador } = require('../controllers/treinadorController');

// Configuração do multer para upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// Rota para listar treinadores
router.get('/lista-treinadores', listarTreinadores);

// Rota para registrar treinador
router.post('/Treinador', upload.single('imagem'), registrarTreinador);

module.exports = router;
