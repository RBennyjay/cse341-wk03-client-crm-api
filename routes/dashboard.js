// routes/dashboard.js
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');

// Dashboard home
router.get('/', ensureAuth, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, ${req.user.displayName || req.user.username}`,
    user: req.user,
  });
});

module.exports = router;
