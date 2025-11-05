const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

// --- User Serialization ---
// After a user logs in, Passport stores *only* their user ID in the session cookie.
passport.serializeUser((user, done) => {
    done(null, user.id); // user.id is the MongoDB _id
});

// When a user makes a new request, Passport takes the ID from the cookie...
passport.deserializeUser((id, done) => {
    // ...and finds the full user object in the database.
    User.findById(id).then(user => {
        done(null, user);
    });
});

// --- Google Strategy ---
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback', // Must match the one in Google Console
            proxy: true // Trust the proxy (needed for services like Heroku)
        },
        async (accessToken, refreshToken, profile, done) => {
            // This callback runs after Google redirects back to our app
            // 1. Check if this user already exists in our DB
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                // 2. If they exist, call 'done' with that user
                return done(null, existingUser);
            }

            // 3. If not, create a new user and save it
            const user = await new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value
            }).save();
            done(null, user);
        }
    )
);

// --- GitHub Strategy ---
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: '/auth/github/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ githubId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({
                githubId: profile.id,
                displayName: profile.displayName,
                email: profile.emails ? profile.emails[0].value : null // GitHub emails can be private
            }).save();
            done(null, user);
        }
    )
);

// --- Facebook Strategy ---
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'emails'], // Fields to request
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ facebookId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({
                facebookId: profile.id,
                displayName: profile.displayName,
                email: profile.emails ? profile.emails[0].value : null
            }).save();
            done(null, user);
        }
    )
);