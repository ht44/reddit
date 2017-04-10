
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {title: 'Cool Stuff', content: 'Have you guys seen this cool stuff? Click here.', user_id: 1},
        {title: 'Top 10 Cats', content: 'Top 10 Cats? This link it shows you them.', user_id: 1},
        {title: 'Unbelievable', content: 'This guy ran me off the road spam him.', user_id: 2},
        {title: 'We are Galvanize', content: 'Latest photos from my cohort.', user_id: 3}
      ]);
    });
};
