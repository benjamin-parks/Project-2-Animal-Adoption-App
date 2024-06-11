const Customer = require('./customer');
// const Employee = require('./employee');
const Pet = require('./pet');
const Inquiries = require('./inquiries');
const Employee = require('./employee');

Pet.hasMany(Inquiries, {
  foreignKey: 'pet_id',
  onDelete: 'CASCADE'
});

Inquiries.belongsTo(Pet, {
  foreignKey: 'pet_id'
});



module.exports = { Inquiries, Pet, Employee };