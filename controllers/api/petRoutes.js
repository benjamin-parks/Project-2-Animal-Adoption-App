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


router.get("/allpets", async (req, res) => {
  try {
  let petData = await Pet.findAll();
  petData = petData.map((pets) => pets.get({plain:true}));
  res.render("search", {
    petsArray:petData
  });
}catch(err) {
  res.status(500).send("Page Not Found");
}
});


module.exports = router;