const ObjectId = require("mongodb").ObjectId;

import Cookies from "cookies";
const jwt = require("jsonwebtoken");

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

const getTicketSeat = async (req, res) => {
  try {
    const cookies = new Cookies(req, res);

    const token = cookies.get("access-token");

    const admin = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const seats = cookies.get(`seats - ${admin.id}`);

    return res.status(200).json({ success: true, values: JSON.parse(seats) });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: [] });
  }
};

const addTicketSeat = async (req, res) => {
  try {
    const cookies = new Cookies(req, res);
    const token = cookies.get(`access-token`);
    const admin = jwt.verify(token, process.env.JWT_SECRET_KEY);
    cookies.set(`seats - ${admin.id}`, req.body);
    return res.status(200).json({ success: true, message: [] });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getTicketSeat(req, res);
    }
    case "POST": {
      return addTicketSeat(req, res);
    }
  }
}
