const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MovieSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId
    },
    qr_code: {
        type: String
    },
    movie_title: {
        type: String
    },
    movie_release_date: {
        type: Date
    },
    movie_date: {
        type: Date
    },
    movie_schedule: {
        type: Date
    },
    movie_seats: [
        {
            type: Object
        }
    ],
    movie_id: {
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.models.Movie || mongoose.model("Cart", MovieSchema);
