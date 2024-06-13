const router = require('express').Router();
const path = require('path');

const Pet = require('../../models/pet');
const { Inquiries } = require('../../models');


router.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../../public/home.html'));
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about-us', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../../public/about-us.html'));
  }
  catch (err) {
    res.status(500).json(err);
  }
});


//renders all animals available for adoption on the /allpets page
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


//renders add new animal form
router.get("/newpet", async (req, res) => {
  try {
    res.render("newpet", { layout: 'employeemain' });
  }
  catch(err) {
    res.status(500).send("Form Not Found");
  }
});


router.post("/api/newpet", async(req, res) => {
  //console.log(req.body);
  const petData = await Pet.create(req.body);
  res.status(200).json(petData);
})
// pet adoption form
router.get("/inquiries", async (req, res) => {

  res.sendFile(path.join(__dirname, '../../views/adoptionapp_copy.html'));
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
      pet_name: pet.pet_name,
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



module.exports = router;