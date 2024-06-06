const sequelize = require('../config/connection');
const { Customer, Employee, Pet } = require('../models');

const customerData = require('./customer.json');
const employeeData = require('./employee.json');
const petData = require('./pet.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: false });

    const pets = await Pet.bulkCreate(petData, {
        individualHooks: true,
        returning: true,
    });

    for (const pet of pets) {
        await Pet.create({
        ...pet,
        owner_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    const customers = await Customer.bulkCreate(customerData, {
        individualHooks: true,
        returning: true,
    });

    for (const customer of customers) {
    await Customer.create({
      ...customer,
      owner_id: users[Math.floor(Math.random() * users.length)].id,
    });


    const employees = await Employee.bulkCreate(employeeData, {
        individualHooks: true,
        returning: true,
    });

    for (const employee of employees) {
        await Employee.create({
        ...employee,
        owner_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

//   for (const project of projectData) {
//     await Project.create({
//       ...project,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

  process.exit(0);
}};

seedDatabase();