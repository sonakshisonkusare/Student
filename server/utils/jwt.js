const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // use env in production

// Function to generate a token
const generateToken = (userData) => {
  return jwt.sign(userData, secretKey, { expiresIn: '1h' });
};

module.exports = generateToken;
