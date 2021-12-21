const mongoose = require("mongoose");
const MovieTimeSchema = new mongoose.Schema({
  time: {
    type: Date,
  },
  description: {
    type: Date,
  },
  movie_seats: [
    {
      type: Object,
    },
  ],
});
module.exports =
  mongoose.models.MovieTime || mongoose.model("MovieTime", MovieTimeSchema);
