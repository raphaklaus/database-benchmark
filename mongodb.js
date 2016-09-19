const bunyan = require('bunyan'),
  mongoose = require('mongoose'),
  Promise = require('bluebird'),
  Schema = mongoose.Schema;

const logger = bunyan.createLogger({
  name: 'mongodb'
});

mongoose.connect('mongodb://localhost/benchmark');
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  name: String,
  bio: String,
  sales: Number,
  views: Number,
  posts: [{
    title: String,
    description: String,
    value: Number,
    tags: String,
    category: {
      name: String
    }
  }]
});

const User = mongoose.model('User', userSchema);
var data = require('./data_mongodb.json');

module.exports = class MongoDB {
  static createPost() {
    logger.info('Using MongoDB');
    var posts = [];

    for (let i = 0; i < Math.floor(Math.random() * 15) + 1; i++) {
      posts.push(data.dataPost);
    }

    var user = data.dataUser;
    user.posts = posts;

    return new User(user).save();
  }

  static getPosts() {
    logger.info('Using MongoDB');
    return User.find().exec()
  }
}
