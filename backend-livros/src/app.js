require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Livro = require('./models/livro');

const app = express();

app.use(express.json());
app.use(cors());

const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_ADDRESS,
    MONGODB_DATABASE
} = process.env;

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.${MONGODB_ADDRESS}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Conectado com sucesso!");
    })
    .catch(e => console.log("Erro na conexão: " + e));

app.get('/api/livros', (req, res) => {
    Livro.find().then(documents => {
        res.status(200).json({
            livros: documents
        });
    });
});

app.post('/api/livros', (req, res) => {
    const livro = new Livro({
        titulo: req.body.titulo,
        autor: req.body.autor,
        numeroPaginas: req.body.numeroPaginas
    });

    livro.save();

    res.status(201).json({ mensagem: "Livro inserido!" });
});

module.exports = app;