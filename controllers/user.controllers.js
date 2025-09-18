// controllers/user.controllers.js
const User = require("../models/models.user"); // Import User model
const nodemailer = require("nodemailer"); // For sending emails
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating login tokens

// ========================
// 1. SIGN UP A NEW USER
// ========================
exports.signupUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Step 1: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send(
        "Email already registered. Please sign in <a href='/user/signin'>here</a>."
      );
    }

    // Step 2: Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step 3: Save new user with hashed password
    const newUser = new User({ firstname, lastname, email, password: hashedPassword });
    await newUser.save();

    // Step 4: Send welcome email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yakubyusuf608@gmail.com", // Replace with your Gmail
        pass: "zxcutnkxkaeehthj", // Use an App Password
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    });

    const mailOptions = {
      from: "yakubyusuf608@gmail.com",
      to: email,
      subject: "Welcome to Our Service 🎉",
      text: `Hello ${firstname},\n\nThank you for signing up! We're happy to have you.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Error sending email: " + error);
      else console.log("Email sent: " + info.response);
    });

    res.send(
      'Signup successful! A welcome email has been sent. You can now <a href="/user/signin">sign in</a>.'
    );
  } catch (err) {
    res.send("Error: " + err.message);
  }
};

// ========================
// 2. LOGIN AN EXISTING USER (with JWT)
// ========================

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found!");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid password!");

  // Create token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    "mysecretkey",
    { expiresIn: "1h" }
  );

  // 👉 Set token in cookie
  res.cookie("token", token, { httpOnly: true });

  // 👉 Redirect to dashboard
  res.redirect("/user/dashboard");
};


// ========================
// 3. GET ALL USERS (for testing)
// ========================
exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).send("Error: " + err.message));
};
