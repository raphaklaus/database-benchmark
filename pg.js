var knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : 'localhost',
    user     : 'postgres',
    password : 'postgres',
    database : 'benchmark',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var Post = bookshelf.Model.extend({
  tableName: 'post'
});

var Category = bookshelf.Model.extend({
  tableName: 'category'
});

// new Post({title: 'teste', description:'asdasd'}).save().then((model) => {
//   console.log('Created model!!');
// })

// new Category({name: 'Fun'}).save().then((model) => {
//   console.log('Created model!!');
// })
