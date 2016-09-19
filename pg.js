const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : 'localhost',
    user     : 'postgres',
    password : 'postgres',
    database : 'benchmark',
    charset  : 'utf8'
  }
});

const data = require('./data_pg.json'),
  bookshelf = require('bookshelf')(knex),
  Category = bookshelf.Model.extend({
    tableName: 'category',
    post: function() {
      return this.hasMany(Post);
    }
  }),
  Post = bookshelf.Model.extend({
    tableName: 'post',
    category: function() {
      return this.belongsTo(Category);
    },
    user: function() {
      return this.belongsTo(User)
    }
  }),
  User = bookshelf.Model.extend({
    tableName: 'user',
    post: function() {
      return this.hasMany(Post);
    }
  }),
  bunyan = require('bunyan'),
  logger = bunyan.createLogger({
    name: 'pg'
  });

module.exports = class PG {
  static createPost() {
    logger.info('Using Postgres');
    return new Post(data.dataPost).save();
  }

  static createUser() {
    logger.info('Using Postgres');
    return new User(data.dataUser).save();
  }

  static createCategory() {
    logger.info('Using Postgres');
    return new Category(data.dataCategory).save();
  }

  static getPosts() {
    logger.info('Using Postgres');
    return new Post().fetchAll({withRelated:['category', 'user']});
  }
}
