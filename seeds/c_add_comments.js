
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {content: 'weak', user_id: 1, post_id: 3},
        {content: 'i like it', user_id: 1, post_id: 3},
        {content: 'could be better', user_id: 1, post_id: 4},
        {content: 'unnaceptable', user_id: 2, post_id: 1},
        {content: 'this angers me', user_id: 2, post_id: 2},
        {content: 'not on my watch', user_id: 2, post_id: 1},
        {content: 'ok you convinced me', user_id: 3, post_id: 2},
        {content: 'boooooo', user_id: 3, post_id: 4},
        {content: 'um...', user_id: 3, post_id: 1},
      ]);
    });
};
