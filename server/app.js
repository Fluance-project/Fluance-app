const express = require('express');
const bodyparser = require('body-parser');
const isOnline = require('is-online');
const db = require('./lib/db');
const UserRouter = require('./routes/user');
const BoardRouter = require('./routes/board');
const RootRouter = require('./routes/root');
const verifyToken = require('./middlewares/security');
var cors = require('cors');

const app = express();

var corsOptions = {
    origin : '*'
};

console.clear();
console.log('\n ###################################################### \n #              DATAHOUSE API START                   #\n ###################################################### \n');

app.use(bodyparser.json());
app.use(cors(corsOptions));

// ROUTES
app.use('/', RootRouter);
app.use('/user', UserRouter);
app.use('/board', BoardRouter);

app.use(verifyToken);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.listen(3003, () => console.log("=> 📡  HTTP Ready [:3003] \n"));

isOnline().then(online => {
    if(online){
        console.log("=> 💾  Database online \n");
    }else{
        console.log("=> 💾  Unable to update database, no internet connection ");
    }
});

db.once('open', () => {});

db.once('error', (error) => console.log(error));