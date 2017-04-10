'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router({mergeParams: true});

router.route('/')

  .get((req, res) => {
    var postId = parseInt(req.params.post_id, 10);
    knex('comments').join('users', 'comments.user_id', 'users.id')
    .select('comments.*', 'users.username', 'users.img_url')
    .where('comments.post_id', postId).then(comments => {
      knex('posts').where('id', postId).first().then(post => {
        res.render('comments/index', {
          comments: comments,
          post: post
        });
      });
    });
  })

  .post((req, res) => {
    var postId = parseInt(req.params.post_id, 10);
    knex('comments').insert({
      content: req.body.content,
      user_id: req.currentUser.id,
      post_id: postId
    }).then(() => {
      res.redirect(`/posts/${postId}/comments`);
    });
  })

router.route('/new')

  .get((req, res) => {
    var postId = parseInt(req.params.post_id, 10);
    res.render('comments/new', {id: postId});
  })


module.exports = router;
