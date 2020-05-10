'use strict';
module.exports = (sequelize, DataTypes) => {
  const {generatePassword} = require('../helpers/bcrypt')
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: 'Your email is empty'
        },
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: 'Your password is empty'
        }
      }
    }
  }, { sequelize });

  User.beforeCreate((instance,options) => {
    let hash = generatePassword(instance.password)
    instance.password = hash
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Recipe)
  };
  return User;
};