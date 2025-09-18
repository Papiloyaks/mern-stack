// middleware/auth.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Get token from request headers
  const authHeader = req.headers["authorization"]; // format: "Bearer TOKEN"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, "mysecretkey"); // use process.env.JWT_SECRET in real apps
    req.user = decoded; // add user info to request object
    next(); // continue to the route
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
