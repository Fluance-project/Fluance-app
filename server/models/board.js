const db = require('../lib/db');
const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: String,
    description: String,
    sources: {
        type: Number,
        min: 0,
        max: 5
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

BoardSchema.methods.onScreen = function() {
    return Date.now() > new Date(`${this.year}-01-01`);
};

BoardSchema.pre('save', function(next) {
    console.log(`Saving ${this.title} ...`);
    next();
});

BoardSchema.post('save', function(avis) {
    console.log(`${avis.title} saved.`);
});

module.exports = db.model('Board', BoardSchema);