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
    type: Number,
  },
  duration: {
    type: Date,
  },
  ratings: {
    type: Number,
  },
  movie_date: [
    {
      type: Object,
    },
  ],
  release_date: {
    type: Date,
  },
  genres: [],
  directors: [],
  actors: [],
  studios: [],
});
module.exports = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
