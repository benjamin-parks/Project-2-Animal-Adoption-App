const router = require('express').Router();
const path = require('path');

const Pet = require('../../models/pet');

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
    res.render("newpet");
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


module.exports = router;