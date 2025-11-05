// This is our custom middleware
module.exports = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
        // If not, send a 401 Unauthorized error
        return res.status(401).send({ error: 'You must be logged in!' });
    }

    // If they are, continue to the next middleware or the route handler
    next();
};