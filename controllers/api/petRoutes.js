const router = require('express').Router();
const path = require('path');

const Pet = require('../../models/pet');
const { Inquiries, Employee } = require('../../models');



//RENDERS HOME PAGE
router.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../../public/home.html'));
  }
  catch (err) {
    res.status(500).json(err);
  }
});


//RENDERS ABOUT US PAGE
router.get('/about-us', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../../public/about-us.html'));
  }
  catch (err) {
    res.status(500).json(err);
  }
});


//RENDERS ADOPTABLE ANIMALS PAGE WITH CARDS FOR ALL PETS
router.get("/allpets", async (req, res) => {
  try {
  let petData = await Pet.findAll();
  petData = petData.map((pets) => pets.get({plain:true}));
  res.render("allpets", {
    petsArray:petData
  });
}catch(err) {
  res.status(500).send("Page Not Found");
}
});



//RENDERS ADOPTION APPLICATION/INQUIRY FORM
router.get("/adoptionapp", async (req, res) => {
  try {
    res.render("adoptionapp", { layout: 'main' });
  }
  catch(err) {
    res.status(500).send("Form Not Found");
  }
});




//RENDERS ADD NEW PET FORM
router.get("/newpet", async (req, res) => {
  try {
    res.render("newpet", { layout: 'employeemain' });
  }
  catch(err) {
    res.status(500).send("Form Not Found");
  }
});

//POSTS NEW PET
router.post("/newpet", async(req, res) => {
  try {
    let pet_image = './images/pets/placeholder.png'; // Declare pet_image variable outside of the if block
    
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


//RENDERS ADD NEW EMPLOYEE FORM
router.get("/newemployee", async (req, res) => {
  try {
    res.render("newemployee", { layout: 'employeemain' });
  }
  catch(err) {
    res.status(500).send("Form Not Found");
  }
});


//RENDERS EMPLOYEE PORTAL HOME PAGE - ACTIVE PET PROFILES IS THE DEFAULT VIEW
router.get("/employeehome", async (req, res) => {
  try {
    const pets = await Pet.findAll();
    const petsArray = pets.map(pet => {
      return {
        id: pet.id,
        pet_name: pet.pet_name,
        pet_age: pet.pet_age,
        pet_type: pet.pet_type,
        pet_breed: pet.pet_breed,
      };
    });
    console.log("test", petsArray);
    res.render("employeehome", { 
      layout: 'employeemain',
      petsArray});
  }
  catch(err) {
    res.status(500).send("Page Not Found");
  }
});





//RENDERS EMPLOYEE PORTAL ADOPTION INQUIRIES PAGE

router.get("/petinquiries", async (req, res) => {
  try {
    const inquiries = await Inquiries.findAll({
      include: {
        model: Pet,
        attributes: ['pet_name'] // Include only the fields you need
      }
    });

    const petsArray = inquiries.map(inquiry => {
      return {
        id: inquiry.id,
        pet_id: inquiry.pet_id,
        customer_name: inquiry.customer_name,
        pet_name: inquiry.pet ? inquiry.pet.pet_name : 'Unknown', // Handle potential undefined Pet
        customer_email: inquiry.customer_email,
        customer_phone: inquiry.customer_phone,
        updated_at: inquiry.createdAt.toLocaleDateString() // Adjust date format if needed
      };
    });

    console.log("test", petsArray);

    res.render("petinquiries", { 
      layout: 'employeemain', 
      petsArray 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});




//RENDERS EMPLOYEE PORTAL CURRENT EMPLOYEES PAGE
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.findAll();

    const employeesArray = employees.map(employee => {
      return {
        id: employee.id,
        employee_name: employee.employee_name,
        employee_email: employee.employee_email,
        employee_phone: employee.employee_phone,
      };
    });

    console.log("test", employeesArray);

    res.render("employees", { 
      layout: 'employeemain', 
      employeesArray 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


router.delete('/employees/:id', async (req, res) => {
  try {
    const employeeData = await Employee.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!employeeData) {
      res.status(404).json({ message: 'No employee found with this id' });
      return;
    }

    res.status(200).json(employeeData);
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json(err);
  }
});


// delete pet from database based on ID
router.delete('/deletepet/:id', async (req, res) => {
  try {
    const petData = await Pet.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!petData) {
      res.status(404).json({ message: 'No pet found with this id' });
      return;
    }
    res.status(200).json(petData);
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json(err);
  }
});


// update pet availabilty to false at given ID 
// router.put('/petinquiries/approve/:id', async (req, res) => {
//   try {
//     const inquiry = await Pet.update(
//       { is_available: false },
//       { where: { id: req.params.id } }
//     );

//     if (!inquiry) {
//       res.status(404).json({ message: 'No inquiry found with this id' });
//       return;
//     }

//     res.status(200).json(inquiry);
//   } catch (err) {
//     console.error('Error details:', err);
//     res.status(400).json(err);
//   }
// });

// approve pet inquiry delete inquiry and pet from databases
router.delete('/petinquiries/approve/:id', async (req, res) => {
  try {
    // get pet id from inquiry relationship
    const inquiryForPetID = await Inquiries.findOne({
      where: {
        id: req.params.id,
      },
    });
    const pet = await Pet.destroy({
      where: {
        id: inquiryForPetID.pet_id,
      },
    });
    if (!pet) {
      res.status(404).json({ message: 'No pet found with this id' });
      return;
    }
    const inquiry = await Inquiries.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!inquiry) {
      res.status(404).json({ message: 'No inquiry found with this id' });
      return;
    }

    res.status(200).json(inquiry);
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json(err);
  }
});

// deny inquiry delete inquiry from database
router.delete('/petinquiries/deny/:id', async (req, res) => {
  try {
    const inquiry = await Inquiries.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!inquiry) {
      res.status(404).json({ message: 'No inquiry found with this id' });
      return;
    }

    res.status(200).json(inquiry);
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json(err);
  }
});












// pet adoption form
router.get("/inquiries", async (req, res) => {
  try {
    res.render("adoptionapp", { layout: 'main' });
  }
  catch(err) {
    res.status(500).send("Form Not Found");
  }
});

// post route for pet adoption form based on ../../public/js/adoptionForm.js
router.post('/inquiries', async (req, res) => {
  try {
    // Find the pet by name to get the pet_id
    const pet = await Pet.findOne({ where: { pet_name: req.body.pet_name } });

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }

    const newInquiry = await Inquiries.create({
      pet_id: pet.id, // Use the pet_id here
      customer_name: req.body.customer_name,
      customer_phone: req.body.customer_phone,
      customer_email: req.body.customer_email,
      customer_message: req.body.customer_message,
    });


    res.status(200).json(newInquiry);
  } catch (err) {
    console.error('Error details:', err);
    res.status(400).json(err);
  }
});


router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/employeehome');
  }
  else{
    res.render('login', { layout: 'main' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { employee_email, employee_password } = req.body;

    // Find the employee by email
    const employeeData = await Employee.findOne({ where: { employee_email } });

    if (!employeeData) {
      return res.status(400).json({ message: 'Incorrect email or password, please try again.' });
    }

    // Check if the entered password matches the hashed password in the database
    const isValidPassword = employeeData.checkPassword(employee_password);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Incorrect email or password, please try again.' });
    }

    // Set up session for the logged in user
    req.session.user_id = employeeData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      res.json({ user: employeeData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const employeeData = await Employee.create({
      employee_name: req.body.employee_name,
      employee_email: req.body.employee_email,
      employee_phone: req.body.employee_phone,
      employee_password: req.body.employee_password,
    });

    req.session.save(() => {
      req.session.user_id = employeeData.id;
      req.session.logged_in = true;

      res.status(200).json(employeeData);
      console.log(employeeData)
      res.redirect('/employeehome');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        // Redirect to login page after session destruction
        res.status(204).redirect('/login');
      }
    });
  } else {
    res.status(404).end();
  }
});





module.exports = router;