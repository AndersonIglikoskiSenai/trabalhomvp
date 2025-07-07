const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');
const messageRoutes = require('../routes/messageRoutes');
const userRoutes = require('../routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

module.exports.handler = serverless(app);
