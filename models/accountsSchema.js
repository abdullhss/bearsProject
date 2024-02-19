const mongoose = require("mongoose");

const schema = mongoose.Schema;

const accountSchema = new schema({
  Name: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Games: {
    type : [String],
    default : []
  },
  date: {
    type: Date,
    default:new Date()
  },
  verified: {
    type: Boolean,
    default: true 
  }
});

const Accounts = mongoose.model("accounts", accountSchema);

module.exports = Accounts;
