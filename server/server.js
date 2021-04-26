/* Imports */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config.js');
const utils = require('./utils.js');
const helmet = require('helmet');
const noCache = require('nocache');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiRouter = require('./api');

app.enable('trust proxy');
app.use(helmet({
    contentSecurityPolicy: false 
}));

app.use(noCache());

/* Configs */
PORT = process.env.PORT || config.port;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

/* Routes */
const slowdownMiddleware = (req, res, next) => {
    if(config.inProd)
        next();
    else
        setTimeout(next, 1000); // Simular delay
};

app.use('/api', slowdownMiddleware, apiRouter);

if(config.inProd) {
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, "../dist/index.html")));
} else {
    app.use('*', createProxyMiddleware({ target: 'http://localhost:3000' }));
}

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});