const ObjectId = require("mongodb").ObjectId;

const MovieSeat = require("../../../models/MovieSeat.js");

import dbConnect from "../../../config/dbConnect";
dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const getSeat = async (req, res) => {
  try {
    const seats = await MovieSeat.find({});

    return res.status(200).json({ success: true, value: seats });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

const addSeat = async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    const seats = new MovieSeat(body);
    const temp = await seats.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    let result = [];
    const errors = err.errors;
    for (const key in errors) {
      result.push(errors[key].properties.message);
    }
    if (result.length >= 1)
      return res.status(200).json({ success: false, message: result });
    if (err.name === "MongoServerError" && err.code === 11000) {
      return res
        .status(200)
        .send({ succes: false, message: ["Seat name already exist!"] });
    }

    return res
      .status(401)
      .json({ success: false, message: ["Admin was updated unsuccessfully."] });
  }
};

const updateSeat = async (req, res) => {
  try {
    const body = JSON.parse(req.body);

    const { id } = body;

    const movieSeat = await MovieSeat.findOneAndUpdate(
      { _id: ObjectId(id) },
      body,
      { upsert: false }
    );

    if (!movieSeat) {
      return res
        .status(200)
        .json({ success: false, message: ["Seats not found"] });
    }

    return res
      .status(200)
      .json({ success: true, message: ["Seats was updated successfully."] });
  } catch (err) {
    let result = [];
    const errors = err.errors;
    for (const key in errors) {
      result.push(errors[key].properties.message);
    }
    if (result.length >= 1)
      return res.status(200).json({ success: false, message: result });
    if (err.name === "MongoServerError" && err.code === 11000) {
      if (err.message.includes("mobile")) {
        return res
          .status(200)
          .send({ succes: false, message: ["Mobile Number already exist!"] });
      } else if (err.message.includes("username")) {
        return res
          .status(200)
          .send({ succes: false, message: ["Username already exist!"] });
      }
      return res
        .status(200)
        .send({ succes: false, message: ["Email already exist!"] });
    }

    return res
      .status(401)
      .json({ success: false, message: ["Admin was updated unsuccessfully."] });
  }
};

const deleteSeat = async (req, res) => {
  try {
    const { id } = req.body;

    const movieSeat = await MovieSeat.findOne({ id: ObjectId(id) });
    movieSeat.remove();

    return res
      .status(200)
      .json({ success: true, message: ["Delete successfully"] });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getSeat(req, res);
    }
    case "POST": {
      return addSeat(req, res);
    }
    case "PUT": {
      return updateSeat(req, res);
    }
    case "DELETE": {
      return deleteSeat(req, res);
    }
  }
}
