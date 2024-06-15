// // this file will handle the homepage routes
// const router = require('express').Router();
// const { Employee } = require('../models');
// const withAuth = require('../utils/auth');
// // const path = require('path');


// // The withAuth middleware is used to check if a user is logged in before allowing them to access certain routes. If the user is not logged in, they will be redirected to the login page.
// router.get('/employeehome', withAuth, async (req, res) => {
//   try {
//     const employeeData = await Employee.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const employee = employeeData.map((project) => project.get({ plain: true }));

//     res.render('employeehome', {
//       users,
//         // The logged_in property is used to determine if a user is logged in or not. If the user is logged in, the value will be true, otherwise it will be false.
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });




// router.get('/login', (req, res) => {
//     // The if statement is used to check if a user is already logged in. If the user is logged in, they will be redirected to the homepage.
//   if (req.session.logged_in) {
//     res.redirect('/employeehome');
//     return;
//   }

//   res.render('login');
// });

// module.exports = router;

const router = require('express').Router();
const { Employee } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/employeehome', withAuth, async (req, res) => {
  try {
    const employeeData = await Employee.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const employees = employeeData.map((project) => project.get({ plain: true }));

    res.render('login', { layout: 'employeemain' }, {
      employees,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/employeehome');
    return;
  }

  res.render('login', { layout: 'employeemain' });
});

module.exports = router;