const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const loanRoutes = require('./routes/loans');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api', userRoutes);
app.use('/api', loanRoutes);

// Sincronizar modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

module.exports = app;