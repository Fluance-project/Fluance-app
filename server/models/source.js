const db = require('../lib/db');
const mongoose = require('mongoose');

const SourceSchema = new mongoose.Schema({
    title: String,
    url: String,
    type: String,
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

SourceSchema.pre('save', function(next) {
    console.log(`Saving ${this.title} ...`);
    next();
});

SourceSchema.post('save', function(avis) {
    console.log(`${avis.title} saved.`);
});

module.exports = db.model('Source', SourceSchema);
