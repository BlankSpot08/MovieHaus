const ObjectId = require("mongodb").ObjectId;

import dbConnect from "../../../config/dbConnect";
import Movie from "../../../models/Movie";
dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.find({});
    return res.status(200).json({ success: true, value: movie });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

const addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const temp = await movie.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    let result = [];
    const errors = err.errors;
    for (const key in errors) {
      if (errors[key].properties) result.push(errors[key].properties.message);
    }
    if (result.length >= 1)
      return res.status(200).json({ success: false, message: result });
    return res.status(200).json({
      success: false,
      message: ["something wrong saving movie modal"],
    });
  }
};
const updateMovie = async (req, res) => {
  try {
    const { _id } = req.body;
    const movie = await Movie.findOneAndUpdate(
      { _id: ObjectId(_id) },
      req.body,
      {
        upsert: false,
      }
    );

    if (!movie) {
      return res
        .status(200)
        .json({ success: false, message: ["Movie not found"] });
    }
    return res
      .status(200)
      .json({ success: true, message: ["Movie was updated successfully."] });
    return res.status(200).json({ success: true });
  } catch (err) {
    let result = [];
    const errors = err.errors;
    console.log(err);
    for (const key in errors) {
      if (errors[key].properties) result.push(errors[key].properties.message);
    }
    if (result.length >= 1)
      return res.status(200).json({ success: false, message: result });
    return res.status(200).json({
      success: false,
      message: ["something wrong saving movie modal"],
    });
  }
};
const deleteMovie = async (req, res) => {
  try {
    const { _id } = req.query;
    const movie = await Movie.findOne({ _id: ObjectId(_id) });
    movie.remove();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getMovie(req, res);
    }

    case "POST": {
      return addMovie(req, res);
    }

    case "PUT": {
      return updateMovie(req, res);
    }

    case "DELETE": {
      return deleteMovie(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
