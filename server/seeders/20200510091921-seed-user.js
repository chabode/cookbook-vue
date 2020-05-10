'use strict';
const { generatePassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('Users', [{
     email: 'admin@mail.id',
     password: generatePassword('admin123'),
     createdAt: new Date(),
     updatedAt: new Date()
   }], {})
  },

  down: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkDelete('Users', null, {})
  }
};
