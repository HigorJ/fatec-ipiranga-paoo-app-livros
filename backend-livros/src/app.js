const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const livros = [
    {
        id: 1,
        titulo: "1984",
        autor: "George Orwell",
        numeroPaginas: 416
    },
    {
        id: 2,
        titulo: "Uma Breve História do Tempo",
        autor: "Stephen Hawking",
        numeroPaginas: 256
    },
    {
        id: 3,
        titulo: "Festa no Céu",
        autor: "Ana Maria Machado",
        numeroPaginas: 32
    }
];

app.get('/api/livros', (req, res) => {
    res.status(200).json({
        livros
    })
});

module.exports = app;