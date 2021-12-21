const mongoose = require("mongoose");
const MovieSeatSchema = new mongoose.Schema({
  x: [Number],
  y: [Number],
  seat_no: {
    type: Number,
  },
  user: [
    {
      type: Object,
    },
  ],
});
module.exports =
  mongoose.models.MovieSeat || mongoose.model("MovieSeat", MovieSeatSchema);
