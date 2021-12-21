const mongoose = require("mongoose");
const MovieDateSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  movie_time: [
    {
      type: Object,
    },
  ],
});
module.exports =
  mongoose.models.MovieDate || mongoose.model("MovieDate", MovieDateSchema);
