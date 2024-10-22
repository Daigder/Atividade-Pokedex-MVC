const express = require('express');
const path = require('path');
const multer = require('multer');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();

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

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/pokemon', upload.single('imagem'), (req, res) => {
    
    const { nome, tipo, altura, peso, nivelDePoder } = req.body;
    const imagemPath = req.file.path;  

    res.send({
        mensagem: "Pokémon criado com sucesso!",
        dados: {
            nome,
            tipo,
            altura,
            peso,
            nivelDePoder,
            imagem: imagemPath
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
