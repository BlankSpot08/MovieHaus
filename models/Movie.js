const { Double } = require("mongodb");
const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add title"],
  },

  video_src: {
    type: String,
    required: [true, "Please add video"],
  },
  image_src: {
    type: String,
    required: [true, "Please add image"],
  },
  price: {
    type: Number,
    required: [true, "Please add price"],
  },
  duration: {
    type: String,
    required: [true, "Movie duration is required"],
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
