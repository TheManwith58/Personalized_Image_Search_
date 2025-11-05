// 1. Environment Variables (MUST BE FIRST)
require('dotenv').config();

// 2. Core Imports
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); // <-- IMPORT express-session
const passport = require('passport');
const axios = require('axios');

// 3. Mongoose Models
require('./models/User');
require('./models/Search');

// 4. Passport Configuration
require('./services/passport');

// 5. Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error(err));

// 6. Initialize Express App
const app = express();

// 7. App Middleware
app.use(express.json());

// --- THIS IS THE UPDATED SESSION CODE ---
// We replace cookieSession with express-session
app.use(
    session({
        secret: process.env.COOKIE_KEY, // Re-uses your existing cookie key
        resave: false,
        saveUninitialized: false
    })
);
// ----------------------------------------

// This middleware tells Passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

// 8. API Routes
require('./routes/authRoutes')(app);
require('./routes/searchRoutes')(app);
require('./routes/analyticsRoutes')(app);
// --- Phase 1 Test Route ---
app.get('/api/test-unsplash', async (req, res) => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: 'modern office',
                per_page: 12
            },
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
            }
        });
        res.json(response.data.results);

    } catch (error) {
        console.error('Error fetching from Unsplash:', error.message);
        res.status(500).send('Error fetching data from Unsplash');
    }
});

// 9. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});