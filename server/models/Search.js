const mongoose = require('mongoose');
const { Schema } = mongoose;

const searchSchema = new Schema({
    term: String,
    timestamp: { type: Date, default: Date.now },
    // This creates a relationship between this schema and the 'User' schema
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Search', searchSchema);