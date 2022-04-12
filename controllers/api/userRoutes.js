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

module.exports = router;