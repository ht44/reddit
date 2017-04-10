
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {full_name: 'Hayden Turek', username: 'guy58', img_url: 'http://bit.ly/2nFRBCA', password_digest: require('bcryptjs').hashSync('hayden', 10)},
        {full_name: 'Avery McGinty', username: 'girl22', img_url: 'http://bit.ly/2nAudW8', password_digest: require('bcryptjs').hashSync('avery', 10)},
        {full_name: 'Zubair Desai', username: 'otherguy99', img_url: 'http://bit.ly/2nM49rq', password_digest: require('bcryptjs').hashSync('zubair', 10)}
      ]);
    });
};
