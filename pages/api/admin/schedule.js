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

const getSchedule = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

const addSchedule = async (req, res) => {
  try {
    const { movie_date, movie_time, _id } = req.body;
    const schedule = { movie_date, movie_time };

    const movie = await Movie.findOne({ _id: ObjectId(_id) });
    if (movie.movie_date) {
      movie.movie_date.push(schedule);
    } else {
      movie.movie_date = [schedule];
    }
    movie.markModified("movie_date");
    movie.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: [] });
  }
};

const updateSchedule = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getSchedule(req, res);
    }

    case "POST": {
      return addSchedule(req, res);
    }

    case "PUT": {
      return updateSchedule(req, res);
    }

    case "DELETE": {
      return deleteSchedule(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
