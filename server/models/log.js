const db = require('../lib/db');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    status: String,
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

AvisSchema.methods.onScreen = function() {
    return Date.now() > new Date(`${this.year}-01-01`);
};

AvisSchema.pre('save', function(next) {
    console.log(`Saving ${this.title} ...`);
    next();
});

AvisSchema.post('save', function(avis) {
    console.log(`${avis.title} saved.`);
});

module.exports = db.model('Task', TaskSchema);