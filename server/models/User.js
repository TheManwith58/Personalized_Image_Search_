const mongoose = require('mongoose');
const { Schema } = mongoose;

// We'll add more fields here during the OAuth phase (Phase 2)
const userSchema = new Schema({
    googleId: String,
    githubId: String,
    facebookId: String,
    displayName: String,
    email: String
});

mongoose.model('User', userSchema);