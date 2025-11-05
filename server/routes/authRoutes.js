const passport = require('passport');

module.exports = app => {
    // --- Google Routes ---
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'] // What we're asking Google for
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('http://localhost:3000/search'); // Redirect to your app's main page (we'll create this in React later)
        }
    );

    // --- GitHub Routes ---
    app.get(
        '/auth/github',
        passport.authenticate('github', {
            scope: ['user:email'] // Request email permission
        })
    );

    app.get(
        '/auth/github/callback',
        passport.authenticate('github'),
        (req, res) => {
           res.redirect('http://localhost:3000/search');
        }
    );

    // --- Facebook Routes ---
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['email'] // Request email permission
        })
    );

    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook'),
        (req, res) => {
            res.redirect('http://localhost:3000/search');
        }
    );

    // --- API Routes for React ---
    
    // Logs the user out by destroying their session cookie
    app.get('/api/logout', (req, res) => {
        req.logout(); // A function added to req by Passport
        res.redirect('/'); // Redirect to the landing page
    });

    // Lets our React app check if a user is logged in
    app.get('/api/current_user', (req, res) => {
        res.send(req.user); // Sends the user model, or null if not logged in
    });
};