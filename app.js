const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const apiKey = 'API KEY';
let favoriteSongs = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search/:query', async (req, res) => {
  const query = req.params.query;

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        key: apiKey,
      },
    });

    const videos = response.data.items.map(item => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
    }));

    res.json(videos);
  } catch (error) {
    console.error('Erro na pesquisa do YouTube:', error.message);
    res.status(500).json({ error: 'Erro na pesquisa do YouTube' });
  }
});

app.get('/favorites', (req, res) => {
  res.json(favoriteSongs);
});

app.post('/favorites', (req, res) => {
  const { title, videoId } = req.body;

  if (!title || !videoId) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  const isAlreadyFavorited = favoriteSongs.some(song => song.videoId === videoId);

  if (!isAlreadyFavorited) {
    favoriteSongs.push({ title, videoId });
    res.json({ message: 'Música adicionada aos favoritos' });
  } else {
    res.status(400).json({ error: 'Música já está nos favoritos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
