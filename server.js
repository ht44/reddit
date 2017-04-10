'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const setUser = require('./middleware/set_user');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cookieSession({
  keys: ['hayden', 'prescott', 'turek']
}));

//custom middleware
app.use(setUser);

//routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/users/:user_id/posts', postsRouter);
app.use('/posts/:post_id/comments', commentsRouter);

app.get('/', (req, res) => {
  res.render('statics/home');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
