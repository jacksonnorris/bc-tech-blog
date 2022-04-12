const router = require('express').Router();
const { Post } = require('../models');
const serialize = require('../utils/serialize');

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({});

    const posts = allPosts.map((post) =>
      serialize(post));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = serialize(postData);

    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;