const mongoose = require("mongoose");
const MovieSeatSchema = new mongoose.Schema({
  seat_name: {
    type: String,
    required: [true, "Please add Seat name"],
    unique: [true, "Seat Name already available"],
  },
  seats: [],
});
module.exports =
  mongoose.models.MovieSeat || mongoose.model("MovieSeat", MovieSeatSchema);
