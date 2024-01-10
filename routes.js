const express = require('express');
const axios = require('axios');
const path = require('path');
const router = express.Router();  // Utiliza express.Router() para criar o router

const apiKey = 'AIzaSyCWiZ33R3I82cT6NZNI2jrZQuA8Gq2fEKs';

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.htm'));
});
  
router.get('/search/:query', async (req, res) => {
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

module.exports = router;  // Exporta o router para ser utilizado em app.js
