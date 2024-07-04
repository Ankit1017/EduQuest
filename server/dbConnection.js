const mongoose = require('mongoose');
const colors = require('colors');

function dbConnection() {
    // MongoDB connection
    const mongoURI = 'mongodb://localhost:27017/questiondb';

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('MongoDB connected'.info.bgWhite))
        .catch(err => console.log('MongoDB connection error:'.black.bgRed, err));
}

module.exports = { dbConnection };