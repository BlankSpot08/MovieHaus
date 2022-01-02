const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MovieSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId
    },
    movie_title: {
        type: String
    },
    movie_release_date: {
        type: Date
    },
    temp: Object,
    movie_seats: [
        {
            type: Object
        }
    ],
    qr_code: {
        type: String
    },
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", MovieSchema);
