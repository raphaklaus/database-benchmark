const express = require('express'),
  app = express(),
  bunyan = require('bunyan'),
  pg = require('./pg.js'),
  mongoDB = require('./mongodb.js');

const logger = bunyan.createLogger({
  name: 'server'
});

app.listen(3000, () => {
  logger.info(`Connected!`);
});

app.get('/posts_pg', (req, res) => {
  pg.getPosts().then(model => {
    logger.info(`GET posts: ${JSON.stringify(model)}`);
    res.json(model);
  });
});

app.post('/posts_pg', (req, res) => {
  pg.createPost().then(model => {
    logger.info(`POST posts: ${JSON.stringify(model)}`);
    res.json(model);
  });
});

app.post('/users_pg', (req, res) => {
  pg.createUser().then(model => {
    logger.info(`POST users: ${JSON.stringify(model)}`);
    res.json(model);
  });
});

app.get('/posts_mongo', (req, res) => {
  mongoDB.getPosts().then(model => {
    logger.info(`GET posts: ${JSON.stringify(model)}`);
    res.json(model);
  });
});

app.post('/posts_mongo', (req, res) => {
  mongoDB.createPost().then(model => {
    logger.info(`POST posts: ${JSON.stringify(model)}`);
    res.json(model);
  });
});

app.post('/users_mongo', (req, res) => {
  mongoDB.createUser().then(model => {
    logger.info(`POST users: ${JSON.stringify(model)}`);
    res.json(model);
  });
});
