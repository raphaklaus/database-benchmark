const bunyan = require('bunyan'),
  mongoose = require('mongoose'),
  Promise = require('bluebird'),
  Schema = mongoose.Schema;

const logger = bunyan.createLogger({
  name: 'mongodb'
});

mongoose.connect('mongodb://localhost/benchmark');
mongoose.Promise = global.Promise;

var userSchema = new Schema({
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

module.exports = class MongoDB {
  static createPost() {
    logger.info('Using MongoDB');
    return userSchema.save();
  }

  static getPost() {
    logger.info('Using MongoDB');
    return userSchema.find().exec()
    })
  }
}
