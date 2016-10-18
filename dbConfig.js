var knex = require('knex') ({
  client:'sqlite3',
  connection: {
    filename:"./db/mydb.sqlite"
  }
});

var bookshelf = require('bookshelf')(knex);

var colors = bookshelf.Model.extend({
  tableName:"colors"
});

bookshelf.knex.schema.hasTable('colors').then(function(exists){
  if(!exists) {
    bookshelf.knex.schema.createTable('colors', function(col){
      col.increments('id').primary();
      col.string('filepath', 255);
      col.integer('colorChange');
      col.string('name', 255);
    }).then(function(table){
      console.log('made a table for saved colors');
    });
  }
});

module.exports.bookshelf = bookshelf;
module.exports.colors = colors;