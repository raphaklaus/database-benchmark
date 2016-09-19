const bunyan = require('bunyan'),
  mongoose = require('mongoose'),
  Promise = require('bluebird'),
  Schema = mongoose.Schema;

const logger = bunyan.createLogger({
  name: 'mongodb'
});

mongoose.connect('mongodb://localhost/benchmark');
mongoose.Promise = global.Promise;

const postSchema = new Schema({
  title: String,
  description: String,
  value: Number,
  tags: String,
  category: {
    name: String
  },
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const userSchema = new Schema({
  name: String,
  bio: String,
  sales: Number,
  views: Number
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
var data = require('./data_mongodb_second_model.json');

module.exports = class MongoDB {
  static createUser() {
    return new User(data.dataUser).save();
  }

  static createPost() {
    logger.info('Using MongoDB');
    return new Post(data.dataPost).save();
  }

  static getPosts() {
    logger.info('Using MongoDB');
    return User.find().exec()
  }
}
