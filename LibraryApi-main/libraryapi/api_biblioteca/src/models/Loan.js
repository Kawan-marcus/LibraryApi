const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./Book');
const User = require('./User');

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  loanDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

Loan.belongsTo(Book);
Loan.belongsTo(User);
Book.hasMany(Loan);
User.hasMany(Loan);

module.exports = Loan;