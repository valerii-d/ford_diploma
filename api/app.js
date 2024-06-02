const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
require('dotenv').config();

const photoDirectory = path.join(__dirname, 'images');
app.use(express.static(photoDirectory));

app.use(express.json());
app.use(cors());

app.use('/', require('./routes/all'));

app.use((err, req, res, next) => {
    console.error('Error: ', err);
    next();
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening on port ${process.env.SERVER_PORT}`);
});
