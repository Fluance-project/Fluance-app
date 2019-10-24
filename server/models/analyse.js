const db = require('../lib/db');
const mongoose = require('mongoose');

const AnalyseSchema = new mongoose.Schema({
    title: String,
    description: String,
    dataset: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    datasetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

AnalyseSchema.pre('save', function(next) {
    console.log(`[Saving] Analyse ${this.id}`);
    next();
});

AnalyseSchema.post('save', function(avis) {
    console.log(`[Saved] Analyse ${avis.id}`);
});

module.exports = db.model('Analyse', AnalyseSchema);