
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments().primary();
    table.string('full_name');
    table.string('username').notNullable().unique();
    table.string('password_digest').notNullable();
    table.text('img_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
