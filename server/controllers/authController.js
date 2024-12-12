const { createUser, findUserByEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await createUser(username, email, hashedPassword);
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error signing up' });
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email); 

  if (user.rows.length > 0) {
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (isValidPassword) {
      const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      const userData = {
        id: user.rows[0].id,
        email: user.rows[0].email, 
        username: user.rows[0].username, 
      };
      res.json({ token, user: userData });
    } else {
      res.status(400).json({ message: 'Invalid Password' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};


module.exports = {
  signup,
  login,
};
