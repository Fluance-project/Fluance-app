const db = require('../lib/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('../models/user')

const BookSchema = new mongoose.Schema({
    title: String,
    createdAt: Date,
    date: {
        type: Number,
        min: 500
    },
    notation: {
        type: Object
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    type: {
        type: Array,
    },
    image: String,
    like: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {toJSON: {virtuals: true}});

BookSchema.virtual('avis', {
    ref: 'Avis',
    localField: '_id',
    foreignField: 'bookId',
    justOne: false // set true for one-to-one relationship
});

BookSchema.index({
    title: 'text',
    author: 'text',
}, {
    weights: {
        title: 5,
        author: 1,
    },
});

BookSchema.methods.onScreen = function () {
    return Date.now() > new Date(`${this.year}-01-01`);
};

BookSchema.pre('save', function (next) {
    console.log(`Saving ${this.title} ...`);
    next();
});

BookSchema.post('save', function (book) {
    console.log(`${book.title} saved.`);
});

module.exports = db.model('Book', BookSchema);