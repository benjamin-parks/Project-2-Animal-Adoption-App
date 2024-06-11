// this file will handle the homepage routes
const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const path = require('path');
// const public = require('../public/css');

// The withAuth middleware is used to check if a user is logged in before allowing them to access certain routes. If the user is not logged in, they will be redirected to the login page.
router.get('/AllUsers', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
        // The logged_in property is used to determine if a user is logged in or not. If the user is logged in, the value will be true, otherwise it will be false.
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    // The if statement is used to check if a user is already logged in. If the user is logged in, they will be redirected to the homepage.
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;