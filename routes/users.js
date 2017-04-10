'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router({mergeParams: true});

router.route('/')

  .get((req, res) => {
    knex.select().from('users').then(results => {
      res.render('users/index', {results: results});
    })
  })

router.route('/:user_id')

  .get((req, res) => {
    var userId = parseInt(req.params.user_id, 10);
    knex('users').where('id', userId).first().then(result => {
      res.render('users/show', {result: result});
    });
  })

  .put((req, res) => {
    var userId = parseInt(req.params.user_id, 10);
    for (var prop in req.body.user) {
      if (req.body.user[prop] === '') {
        delete req.body.user[prop];
      }
    }
    knex('users').where('id', userId).update(req.body.user)
    .returning('id')
    .then(id => {
      res.redirect(`/users/${id}`);
    });
  })

  .delete((req, res) => {
    req.session = null;
    var userId = parseInt(req.params.user_id, 10);
    knex('users').where('id', userId).del().then(() => {
      res.redirect('/users');
    });
  })

router.route('/:user_id/edit')

  .get((req, res) => {
    res.render('users/edit');
  })


module.exports = router;
