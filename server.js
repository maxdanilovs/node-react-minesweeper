const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    name: "minesweeper_cookies",
    secret: 'not important',
    resave: false,
    saveUninitialized: true
}))

// const config = require('./config/config');
const db = process.env.mongoUri;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Games router
const gamesRouter = require('./routes/games');
app.use('/games', gamesRouter);

// Records router
const recordsRouter = require('./routes/records');
app.use('/records', recordsRouter);

// Set static if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('./client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));