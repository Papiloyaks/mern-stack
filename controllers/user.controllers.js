// controllers/user.controllers.js
const User = require("../models/models.user"); // get our User model (data rules)

// step 1: Sign up a new user
exports.signupUser = (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        // Stop here by returning, so next .then is skipped
        res.send("Email already registered. Please sign in <a href='/user/signin'>here</a>.");
        return; // Important: end the function chain
      }

      const newUser = new User({ firstname, lastname, email, password });
      return newUser.save();
    })
    
    .then(savedUser => {
      if (!savedUser) return; // If we already responded, do nothing

      res.send('Signup successful! You can now <a href="/user/signin">sign in</a>.');
    })
    .catch(err => {
      if (!res.headersSent) { // Prevent double-send if an error occurs after response
        res.send("Error: " + err.message);
      }
    });
};


// TEACHER 2: Login an existing user
exports.loginUser = (req, res) => {
  const { email, password } = req.body; // get login info

  // Look for someone with this email and password
  User.findOne({ email, password })
    .then(user => {
      if (!user) {
        // If no one found, wrong info
        return res.send("Invalid email or password.");
      }

      // If found, send them to the dashboard with their names
      res.redirect(`/user/dashboard?firstname=${user.firstname}&lastname=${user.lastname}`);
    })
    .catch(err => {
      res.send("Error: " + err.message);
    });
};

// TEACHER 3: Show all users (just for testing)
exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => {
      res.json(users); // show the list
    })
    .catch(err => {
      res.status(500).send("Error: " + err.message);
    });
};
