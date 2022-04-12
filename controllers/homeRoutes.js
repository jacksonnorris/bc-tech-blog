const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({});
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;