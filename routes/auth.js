const express = require('express');
const passport = require('passport');
const router = express.Router();

// Removed Swagger documentation for this route
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Removed Swagger documentation for this route
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard'); // You can change this path
  }
);

// Optional logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
