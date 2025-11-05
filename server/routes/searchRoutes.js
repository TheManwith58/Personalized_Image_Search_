const mongoose = require('mongoose');
const axios = require('axios');
const requireLogin = require('../middleware/requireLogin'); // Import our middleware

const Search = mongoose.model('Search'); // Get our Search model

module.exports = app => {
    /**
     * @route   POST /api/search
     * @desc    Search Unsplash, save term to history
     * @access  Private (requires login)
     */
    app.post('/api/search', requireLogin, async (req, res) => {
        const { term } = req.body;

        try {
            // 1. Save the search to our database
            const search = new Search({
                term,
                user: req.user.id // req.user is available thanks to Passport
            });
            await search.save();

            // 2. Call the Unsplash API
            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: term,
                    per_page: 12
                },
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
                }
            });

            // 3. Send results back to the client
            res.send(response.data.results);

        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Search failed' });
        }
    });

    /**
     * @route   GET /api/history
     * @desc    Get the current user's search history
     * @access  Private (requires login)
     */
    app.get('/api/history', requireLogin, async (req, res) => {
        try {
            // Find all searches where the 'user' field matches the logged-in user's ID
            const history = await Search.find({ user: req.user.id })
                                        .sort({ timestamp: -1 }) // Sort by newest first
                                        .limit(20); // Get the 20 most recent

            res.send(history);
        } catch (err) {
            res.status(500).send({ error: 'Failed to fetch history' });
        }
    });
};