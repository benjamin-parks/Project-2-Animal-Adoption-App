// This file will contain the routes to handle user login and logout.
// The login route will be used to log a user in by checking their email and password against the database.
const router = require('express').Router();
const { User, Pet, Customer } = require('../../models');

router.post('/employeelogin', async (req, res) => {
  try {
    // The findOne() method is used to find a single document in the collection that matches the query. In this case, it is used to find a user by their email address.
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // The checkPassword() method is used to check the password entered by the user against the hashed password stored in the database.
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // The save() method is used to save the session and will store the session in the store.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.employee = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// post route for employee to add a new pet
  router.post('/addpet', async (req, res) => {
    if (!req.session.logged_in && !req.session.employee) {
        res.status(401).json({ message: 'An employee has to be logged in to add a pet.' });
        return;
        }
    try {
      const newPet = await Pet.create({
        pet_name: req.body.pet_name,
        pet_age: req.body.pet_age,
        pet_type: req.body.pet_type,
        pet_breed: req.body.pet_breed,
        pet_description: req.body.pet_description,
        pet_image: req.body.pet_image,
        is_available: true,
        owner_id: null,
      });
  
      res.status(200).json(newPet);
    } catch (err) {
      console.error('Error details:', err);
      res.status(400).json(err);
    }
  });

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
