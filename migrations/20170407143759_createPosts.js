
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table => {
    table.increments().primary();
    table.string('title').notNullable().unique();
    table.text('content').notNullable();
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
