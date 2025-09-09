// routes/user.routes.js
const express = require("express");
const router = express.Router();

// Bring our teachers (controllers)
const userController = require("../controllers/user.controllers");

// If you go to /signup (GET) → show the signup form
router.get("/signup", (req, res) => res.render("signup"));

// If you send data to /signup (POST) → let the teacher handle signup
router.post("/signup", userController.signupUser);

// If you go to /signin (GET) → show the signin form
router.get("/signin", (req, res) => res.render("signin"));

// If you send data to /login (POST) → let the teacher handle login
router.post("/login", userController.loginUser);   // FIX: removed /user/

// Show everyone (for testing)
router.get("/", userController.getAllUsers);      // FIX: removed /user

// Show the dashboard (after login)
router.get("/dashboard", (req, res) => {
  const { firstname, lastname } = req.query;
  res.render("dashboard", { firstname, lastname });
});

module.exports = router;

        
