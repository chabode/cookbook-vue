'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Recipe extends Model{}
  Recipe.init({
    meal: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: 'Your Meal is empty'
        }
      }  
    },
    category: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg: 'Your Category is empty'
        }
      }  
    },
    instructions: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Your Instructions is empty'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull : true
    },
    UserId : {
      type: DataTypes.INTEGER
    }
  }, { sequelize });
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsTo(models.User)
  };
  return Recipe;
};