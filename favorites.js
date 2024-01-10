const express = require('express');
const router = express.Router();
const favoritesModel = require('./models/favoritesModel');

// Adicione o middleware express.json() para tratar dados JSON
router.use(express.json());

router.get('/', (req, res) => {
  favoritesModel.getAllFavorites((err, results) => {
    if (err) {
      console.error('Erro ao obter músicas favoritas:', err.message);
      res.status(500).json({ error: 'Erro ao obter músicas favoritas' });
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
  // Certifique-se de que o corpo da solicitação (req.body) está sendo enviado corretamente
  const { title, videoId } = req.body;

  if (!title || !videoId) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  favoritesModel.addFavorite(title, videoId, (err) => {
    if (err) {
      console.error('Erro ao adicionar música aos favoritos:', err.message);
      res.status(500).json({ error: 'Erro ao adicionar música aos favoritos' });
    } else {
      res.json({ message: 'Música adicionada aos favoritos' });
    }
  });
});

// Adicione rotas de update e delete conforme necessário

module.exports = router;
