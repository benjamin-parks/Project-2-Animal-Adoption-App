const sequelize = require('../config/connection');
const { Customer, Employee, Pet } = require('../models');

const customerData = require('./customer.json');
const employeeData = require('./employee.json');
const petData = require('./pet.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: false });

    // Seeding pets first, assuming pets don't need foreign keys initially
    await Pet.bulkCreate(petData, {
        individualHooks: true,
        returning: true,
    });

    // Seeding customers
    const customers = await Customer.bulkCreate(customerData, {
        individualHooks: true,
        returning: true,
    });

    // Assigning owner_id to pets
    for (const pet of petData) {
        await Pet.update({ owner_id: customers[Math.floor(Math.random() * customers.length)].id }, { where: { id: pet.id } });
    }

    // Seeding employees
    await Employee.bulkCreate(employeeData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
