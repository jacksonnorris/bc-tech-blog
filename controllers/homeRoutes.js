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
      // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;