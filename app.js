// server.js
const express = require('express');
const path = require('path');
const app = express();

const routes = require('./routes');
const favorites = require('./favorites.js');

app.use('/', routes);
app.use('/favorites', favorites);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


