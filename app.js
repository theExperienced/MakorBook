require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('CONNECTED');
});
