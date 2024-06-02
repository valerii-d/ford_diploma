/* eslint-disable no-undef */
const path = require('path');
const express = require('express');
require('dotenv').config();

const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.SERVER_PORT;
const app = express();

app.use(express.static(DIST_DIR));

app.get('/health', (req, res) => {
  res.send('v 0.0.2');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT);
