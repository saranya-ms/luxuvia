const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router();

// POST login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check against environment variables
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET admin profile (protected)
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({ admin: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
