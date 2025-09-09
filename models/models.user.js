// models/models.user.js
const mongoose = require("mongoose"); // we bring mongoose to talk to MongoDB

// We create a "rule book" for our users
const userSchema = new mongoose.Schema({
  firstname: String,          // first name of the user
  lastname: String,           // last name of the user
  email: { type: String, unique: true }, // email must be special (no two the same)
  password: String            // password (we keep it simple for now)
});

// Now we turn that rule book into a real model we can use
module.exports = mongoose.model("User", userSchema);



