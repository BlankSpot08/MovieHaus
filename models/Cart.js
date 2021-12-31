const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"],
        unique: [true, "Username already available"],
    },
    movie_data: {
        type: Object
    },
    movie_time: {
        type: Object
    },
    movie_seats: {
        type: Object
    }
});

module.exports = mongoose.models.Movie || mongoose.model("Cart", MovieSchema);
