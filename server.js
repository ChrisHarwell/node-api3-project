const express = require('express');
const postRouter = require("./posts/postRouter.js");
const helmet = require('helmet');
const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/post', postRouter)
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request`);
  next();
}

module.exports = server;
