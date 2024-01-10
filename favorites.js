const express = require('express');
const router = express.Router();
const favoritesModel = require('./models/favoritesModel');

router.use(express.json());
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

router.delete('/:id', (req, res) => {
  const favoriteId = req.params.id;

  favoritesModel.removeFavorite(favoriteId, (err) => {
    if (err) {
      console.error('Erro ao remover música dos favoritos:', err.message);
      res.status(500).json({ error: 'Erro ao remover música dos favoritos' });
    } else {
      res.json({ message: 'Música removida dos favoritos' });
    }
  });
});

module.exports = router;
