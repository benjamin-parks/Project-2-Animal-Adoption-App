// // This file will contain the routes to handle user login and logout.
// // The login route will be used to log a user in by checking their email and password against the database.
// const router = require('express').Router();
// const { Employee } = require('../../models');


// router.post('/login', async (req, res) => {
//   try {
//     // The findOne() method is used to find a single document in the collection that matches the query. In this case, it is used to find a user by their email address.
//     const employeeData = await Employee.findOne({ where: { email: req.body.email } });

//     if (!employeeData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     // The checkPassword() method is used to check the password entered by the user against the hashed password stored in the database.
//     const validPassword = await employeeData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     // The save() method is used to save the session and will store the session in the store.
//     req.session.save(() => {
//       req.session.user_id = employeeDataData.id;
//       req.session.logged_in = true;
//       req.session.employee = false;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
// // The logout route will be used to log a user out by destroying the session.
// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     // The destroy() method is used to destroy the session and will remove the session from the store, and will unset the req.session property.
    
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// module.exports = router;
