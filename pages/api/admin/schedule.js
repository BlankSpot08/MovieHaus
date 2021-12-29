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
    console.log(movie.movie_date.length);
    if (!movie) return res.status(400).json({ success: false });
    const obj = movie.movie_date;
    if (
      !(
        movie.movie_date.length <= 1 &&
        obj &&
        Object.keys(movie.movie_date[0]).length === 0 &&
        Object.getPrototypeOf(movie.movie_date[0]) === Object.prototype
      )
    ) {
      movie.movie_date.push(schedule);
    } else {
      console.log("update");
      movie.movie_date = [schedule];
    }
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
