const ObjectId = require("mongodb").ObjectId;

const User = require("../../../models/User");

import dbConnect from "../../../config/dbConnect";
dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const register = async (req, res) => {
  try {
    if (req.body.password_confirmation != password) {
      return res.status(200).json({
        success: false,
        message: ["Confirm password is not the same as password"],
      });
    }

    const user = await User(req.body)
    user.save()

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
      if (err.message.includes("mobile")) {
        return res
          .status(200)
          .send({ succes: false, message: ["Mobile Number already exist!"] });
      }

      return res
        .status(200)
        .send({ succes: false, message: ["Email already exist!"] });
    }
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return register(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
