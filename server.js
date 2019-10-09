const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoute = require('./routes/authRoute.js');
const virgilRoute = require('./routes/virgilRoute.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', authRoute);

server.use('/virgil-jwt', virgilRoute)

server.get('/', (req, res) => {
    res.status(200).json({message: 'server is working!!!'})
})

module.exports = server;