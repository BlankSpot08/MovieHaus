const { Double } = require("mongodb");
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    item: {
        type: Object
    },
    username: {
        type: String,
        required: [true, "Please add username"],
        unique: [true, "Username already available"],
    }
});
module.exports = mongoose.models.Movie || mongoose.model("Cart", MovieSchema);
