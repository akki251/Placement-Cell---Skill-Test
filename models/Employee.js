const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Employee must have a name'],
  },

  email: {
    type: String,
    required: [true, 'Employee must have an email'],
    unique: [true, 'Must be unique'],
  },

  password: {
    type: String,
    required: [true, 'Employee must have a password'],
  },
});

employeeSchema.methods.verifyPassword = function (bodyPassword) {
  return this.password === bodyPassword;
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
