const ObjectId = require("mongodb").ObjectId;

import Movie from "../../../models/Movie";
import dbConnect from "../../../config/dbConnect";
dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()

    return res.status(200).json({ success: true, value: movies });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

const getMovie = async (req, res) => {
  try {
    const { title } = req.query
    console.log(title)
    const movie = await Movie.findOne({ title: title })

    return res.status(200).json({ success: true, value: movie });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      if (req.query.title) {
        return getMovie(req, res)
      }
      return getMovies(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
