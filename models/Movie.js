const { Double } = require("mongodb");
const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add username"],
  },

  video_src: {
    type: String,
  },
  image_src: {
    type: String,
  },
  price: {
    type: Double,
  },
  duration: {
    type: Date,
  },
  ratings: {
    type: Double,
  },
  movie_date: [
    {
      type: Object,
    },
  ],
  genres: [],
  directors: [],
  actors: [],
  studios: [],
});
module.exports = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
