const mongoose = require("mongoose");
const MovieTimeSchema = new mongoose.Schema({
  time: {
    type: Date,
  },
  description: {
    type: String,
  },
  movie_seats: [
    {
      type: Object,
    },
  ],
});
module.exports =
  mongoose.models.MovieTime || mongoose.model("MovieTime", MovieTimeSchema);
