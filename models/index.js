const Customer = require('./customer');
// const Employee = require('./employee');
const Pet = require('./pet');

const Employee = require('./employee');

Customer.hasMany(Pet, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(Customer, {
  foreignKey: 'owner_id'
});



module.exports = { Customer, Pet, Employee };