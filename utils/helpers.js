const bcrypt = require('bcrypt');

module.exports = {
    // Function to hash a password using bcrypt
  hashPassword: async (plainPassword) => {
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, 10); 
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Error hashing password');
    }
  },

  validatePassword: async (inputPassword, storedPasswordHash) => {
    try {
      return await bcrypt.compare(inputPassword, storedPasswordHash);
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  // You can add other helper functions here
};