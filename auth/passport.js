const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ githubId: profile.id });

    if (existingUser) return done(null, existingUser);

    const newUser = await User.create({
      githubId: profile.id,
      displayName: profile.displayName,
      username: profile.username,
      profileUrl: profile.profileUrl,
    });

    done(null, newUser);
  } catch (err) {
    done(err);
  }
}));
