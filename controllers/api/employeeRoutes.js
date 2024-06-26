// This file will contain the routes to handle user login and logout.
// The login route will be used to log a user in by checking their email and password against the database.
const router = require('express').Router();
const { User, Pet, Customer, Employee } = require('../../models');
const path = require('path');
// const { hashPassword, validatePassword } = require('../../utils/helpers');




// router.get('/inquiries', async (req, res) => {
//     // uncomment once we have login-session functionality
//   // if (!req.session.logged_in && !req.session.employee) {
//   //   res.redirect('/employeelogin');
//   //   return;
//   // }
//   try {
//     res.sendFile(path.join(__dirname, '../../views/05-adoption-inquiries.html'));
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });


// router.get('/login', async (req, res) => {
//   // uncomment once we have login-session functionality
//   // if (!req.session.logged_in && !req.session.employee) {
//   //   res.redirect('/employeelogin');
//   //   return;
//   // }
//   try {
//     res.sendFile(path.join(__dirname, '../../views/03-employee-login.html'));
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });




// router.get('/wishlist', async (req, res) => {
//   // uncomment once we have login-session functionality
//   // if (!req.session.logged_in && !req.session.employee) {
//   //   res.redirect('/employeelogin');
//   //   return;
//   // }
//   try {
//     res.sendFile(path.join(__dirname, '../../views/07-wish-list.html'));
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });


/////////////// POSTS UNDER THIS LINE //////////////////////
// app.post('/signup', async (req, res) => {
//   try {
//       const { username, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = await User.create({
//           username,
//           hash_pword: hashedPassword
//       });
//       res.status(200).json(newUser);
//       return;
//   } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//   }
// });
// app.post('/login', async (req, res) => {
//   try {
//       const { username, password } = req.body;
//       const user = await User.findOne({
//           where: { username }
//       });
//       if (!user) {
//           res.status(404).json({ message: 'User not found' });
//           return;
//       }
//       const isValidPassword = await bcrypt.compare(password, user.hash_pword);
//       if (!isValidPassword) {
//           res.status(401).json({ message: 'Invalid password' });
//           return;
//       }
//       res.status(200).json({ message: 'Login successful' });
//   } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//   }
// });
// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
// });




// //employee login route
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

//     const validPassword = await validatePassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     // The save() method is used to save the session and will store the session in the store.
//     req.session.save(() => {
//       req.session.employee_id = employeeData.id;
//       req.session.logged_in = true;
//       req.session.employee = true;
      
//       res.sendFile(path.join(__dirname, '../../public/home.html'));
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// //employee signup route
// router.post('/signup', async (req, res) => {
//   try {
//     const hashedPassword = await hashPassword(req.body.password);
//     const newEmployee = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       phone: req.body.phone,
//       password: hashedPassword,
//     });

//     req.session.save(() => {
//       req.session.user_id = newEmployee.id;
//       req.session.logged_in = true;

//       res.json({ employee: newEmployee, message: 'You are now signed up!' });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });


// post route for employee to add a new pet
  router.post('/addpet', async (req, res) => {
    // if (!req.session.logged_in && !req.session.employee) {
    //     res.status(401).json({ message: 'An employee has to be logged in to add a pet.' });
    //     return;
    //     }
    console.log("test add pet route", req.body)
    try {
      let pet_image = '../../public/images/pets/default.jpg'; // Declare pet_image variable outside of the if block
      
      if (req.body.pet_image) { // Check if pet_image is provided
        pet_image = req.body.pet_image; // Assign provided pet_image value
      }
      
      const newPet = await Pet.create({
        pet_name: req.body.pet_name,
        pet_age: req.body.pet_age,
        pet_type: req.body.pet_type,
        pet_breed: req.body.pet_breed,
        pet_description: req.body.pet_description,
        pet_image: pet_image, // Use the assigned value for pet_image
        is_available: true,
        owner_id: null,
      });
    console.log("newPet", newPet)
      res.status(200).json(newPet);
    } catch (err) {
      console.error('Error details:', err);
      res.status(400).json(err);
    }
  });


  ///////////////// PUTS UNDER THIS LINE //////////////////////


// post route for employee to update a pet's status
router.put('/updatepet/:id', async (req, res) => {
  if (!req.session.logged_in && !req.session.employee) {
    res.status(401).json({ message: 'An employee has to be logged in to update a pet.' });
    res.redirect('/login');
    return;
  }
  else {
    try {
      const petData = await Pet.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (!petData) {
        res.status(404).json({ message: 'No pet found with this id!' });
        return;
      }
  
      res.status(200).json(petData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});



//////////////////// DELETES UNDER THIS LINE //////////////////////



// route for employee to delete a pet
router.delete('/deletepet/:id', async (req, res) => {
  if (!req.session.logged_in && !req.session.employee) {
    res.status(401).json({ message: 'An employee has to be logged in to delete a pet.' });
    res.redirect('/login');
    return;
  }
  else {
    try {
      const petData = await Pet.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!petData) {
        res.status(404).json({ message: 'No pet found with this id!' });
        return;
      }
  
      res.status(200).json(petData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// delete route for removing an employee from the database
router.delete('/deleteemployee/:id', async (req, res) => {
  if (!req.session.logged_in && !req.session.employee) {
    res.status(401).json({ message: 'An employee has to be logged in to delete an employee.' });
    res.redirect('/login');
    return;
  }
  else {
    try {
      const employeeData = await Employee.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!employeeData) {
        res.status(404).json({ message: 'No employee found with this id!' });
        return;
      }

      res.status(200).json(employeeData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// delete route for removing a customer from the database
// un-comment if we decide to add a customer database in the future 

// router.delete('/deletecustomer/:id', async (req, res) => {
//   if (!req.session.logged_in && !req.session.employee) {
//     res.status(401).json({ message: 'An employee has to be logged in to delete a customer.' });
//     res.redirect('/login');
//     return;
//   }
//   else {
//     try {
//       const customerData = await Customer.destroy({
//         where: {
//           id: req.params.id,
//         },
//       });
  
//       if (!customerData) {
//         res.status(404).json({ message: 'No customer found with this id!' });
//         return;
//       }
  
//       res.status(200).json(customerData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// });

//////////////////// LOGOUT ROUTE //////////////////////

// The logout route will be used to log a user out by destroying the session.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // The destroy() method is used to destroy the session and will remove the session from the store, and will unset the req.session property.
    
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
