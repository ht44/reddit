'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router({mergeParams: true});

router.route('/')

  .get((req, res) => {
    if (req.params.user_id) {
      var userId = parseInt(req.params.user_id, 10);
      knex('posts').where('user_id', userId).then(posts => {
        res.render('posts/index', {posts: posts});
      });
    } else {
      knex.select('id', 'title').from('posts').then(posts => {
        res.render('posts/index', {posts: posts});
      });
    }
  })

  .post((req, res) => {
    req.body.post.user_id = res.locals.currentUser.id;
    knex('posts').insert(req.body.post).returning('id').then(id => {
      res.redirect(`/posts/${id}`);
    }).catch(err => {
      res.send('Needs unique title');
    })
  })

router.route('/new')

  .get((req, res) => {
    res.render('posts/new');
  })

router.route('/:post_id')

  .get((req, res) => {
    var postId = parseInt(req.params.post_id, 10);
    knex('posts').join('users', 'posts.user_id', 'users.id')
    .select('posts.id', 'posts.user_id', 'posts.title', 'posts.content', 'users.username')
    .where('posts.id', postId)
    .first()
    .then(post => {
      // res.send(post);
      res.render('posts/show', {post: post});
    });
  })

  .put((req, res) => {
    var postId = parseInt(req.params.post_id, 10);
    for (var prop in req.body.post) {
      if (req.body.post[prop] === '') {
        delete req.body.post[prop];
      }
    }
    knex('posts').where('id', postId).first().update(req.body.post).then(() => {
      res.redirect(`/posts/${postId}`);
    }).catch(err => {
      console.error(err);
      res.redirect(`/posts/${postId}`);
    })
  })

  .delete((req, res) => {
    var postId = parseInt(req.params.post_id, 10);
    var userId = res.locals.currentUser.id
    knex('posts').where('id', postId).del().then(() => {
      res.redirect(`/users/${userId}/posts`);
    });
  })

router.route('/:post_id/edit')

  .get((req, res) => {
    var postId = parseInt(req.params.post_id, 10);
    res.render('posts/edit', {id: postId});
  })




module.exports = router;
