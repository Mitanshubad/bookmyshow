const mongoose = require('mongoose');

// Define a schema for movie booking details
const bookMovieSchema = new mongoose.Schema({
    movie: String,
    slot: String,
    seats: {
        A1: Number,
        A2: Number,
        A3: Number,
        A4: Number,
        D1: Number,
        D2: Number
    }
});

// Register the schema with mongoose as a model
const BookMovieTicket = mongoose.model('BookMovieTicket', bookMovieSchema);

module.exports = BookMovieTicket;
