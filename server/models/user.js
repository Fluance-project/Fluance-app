const db = require('../lib/db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    dob: Date,
    termsAccepted: Boolean,
}, {toJSON: {virtuals: true}});


UserSchema.virtual('task', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'userId',
    justOne: false 
});

UserSchema.virtual('board', {
    ref: 'Board',
    localField: '_id',
    foreignField: 'userId',
    justOne: true 
});

UserSchema.virtual('analyse', {
    ref: 'Analyse',
    localField: '_id',
    foreignField: 'userId',
    justOne: false 
});

UserSchema.virtual('datastories', {
    ref: 'Datastory',
    localField: '_id',
    foreignField: 'userId',
    justOne: false 
});

UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(this.password, salt).then(hash => {
            this.password = hash;
            console.log(`=> [Password hashed] User : ${this.id}`);
            next();
        })
    });
});

UserSchema.methods = {
    register: function () {
        return this.save();
    }
};

UserSchema.statics = {
    login: function (email, password) {
        return new Promise((resolve, reject) => {
            User.findOne({'email': email}).then(user => {
                if (!user) return reject('User not found')
                bcrypt.compare(password, `${user.password}`).then(res => res ? resolve(user) : reject('Wrong password'));
            })
        });
    }
}

UserSchema.post('save', function (user) {
    console.log(`${user.firstname} ${user.lastname} saved.`);
});

const User = db.model('User', UserSchema);
module.exports = User;
