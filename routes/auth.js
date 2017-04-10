'use strict';

const express = require('express');
const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const router = express.Router();


router.route('/logout')

  .get((req, res) => {
    req.session = null;
    res.redirect('/');
  })

router.route('/login')

  .get((req, res) => {
    res.render('statics/login');
  })

  .post((req, res) => {
    knex('users').where('username', req.body.username).first().then(user => {
      if (user) {
        var isUser = bcrypt.compareSync(req.body.password, user.password_digest);
        if (isUser) {
          req.session.userId = user.id;
          res.redirect(`/users/${user.id}`);
        } else {
          res.send('Unauthorized');
        }
      } else {
        res.redirect('/auth/register');
      }
    })
  })


router.route('/register')

  .get((req, res) => {
    res.render('statics/register');
  })

  .post((req, res) => {

    knex('users').where('username', req.body.username).first().then(user => {
      if (!user) {
        var userDigest = bcrypt.hashSync(req.body.password, 10);
        knex('users').insert({
          username: req.body.username,
          password_digest: userDigest
        }).returning('id').then(id => {
          res.redirect('/auth/login');
        });
      } else {
        res.send('user already exists');
      }
    })

  })



module.exports = router;
