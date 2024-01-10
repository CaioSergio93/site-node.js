const connection = require('../db/connection');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS favoriteSongs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    videoId VARCHAR(255) NOT NULL
  );
`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Erro ao criar tabela:', err.message);
  } else {
    console.log('Tabela criada com sucesso');
  }
});

const favoritesModel = {
  getAllFavorites: (callback) => {
    connection.query('SELECT * FROM favoriteSongs', callback);
  },

  addFavorite: (title, videoId, callback) => {
    const insertQuery = 'INSERT INTO favoriteSongs (title, videoId) VALUES (?, ?)';
    connection.query(insertQuery, [title, videoId], callback);
  },

  // Adicione métodos de update e delete conforme necessário
};

module.exports = favoritesModel;
