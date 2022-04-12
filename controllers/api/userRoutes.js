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

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      console.log('user')
      if (user.validatePassword(user.password)) {
        console.log('valid')
        req.session.save(() => {
          req.session.loggedIn = true;
        });
        res.json({ user, message: 'login succesful' });
      }
    }
    res.status(400).json({ message: 'Email or password is incorrect' });
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;