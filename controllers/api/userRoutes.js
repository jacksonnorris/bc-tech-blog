const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll({});
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    })
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;