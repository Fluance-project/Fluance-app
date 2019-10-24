const mongoose = require('mongoose');


// On set l'object mongo avec les variables d'encvironnement
mongoose.connect('mongodb://localhost', {
    user: "root",
    pass: "root",
    dbName: "datahouse",
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', function () {
    console.log("=> 🗄️  MongoDB Ready [:27017]");
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('=> 🗄️  MongoDB Connection Loosed [X]');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('=> 🗄️  MongoDB ' + err);
});

// avoid index key error notice
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// On récupère la connexion et on bind la connexion
module.exports = mongoose.connection;