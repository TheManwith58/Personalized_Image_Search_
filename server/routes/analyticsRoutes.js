const mongoose = require('mongoose');
const Search = mongoose.model('Search');

module.exports = app => {
    /**
     * @route   GET /api/top-searches
     * @desc    Get the top 5 most frequent search terms
     * @access  Public
     */
    app.get('/api/top-searches', async (req, res) => {
        try {
            const topSearches = await Search.aggregate([
                {
                    // 1. Group all documents by the 'term' field
                    $group: {
                        _id: '$term', // The field to group by
                        count: { $sum: 1 } // Count 1 for each document in the group
                    }
                },
                {
                    // 2. Sort the groups by the 'count' field in descending order
                    $sort: { count: -1 }
                },
                {
                    // 3. Limit the results to the top 5
                    $limit: 5
                },
                {
                    // 4. (Optional) Rename '_id' to 'term' for a cleaner output
                    $project: {
                        _id: 0, // Suppress the _id field
                        term: '$_id', // Create a new field 'term' from the value of '_id'
                        count: 1 // Include the count
                    }
                }
            ]);

            res.send(topSearches);

        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Failed to fetch top searches' });
        }
    });
};