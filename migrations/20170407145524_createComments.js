
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', table => {
    table.increments().primary();
    table.text('content');
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
    table.integer('post_id').references('id').inTable('posts').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
