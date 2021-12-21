import Cookies from "cookies";

const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
const User = require("../../../models/User.js");

import dbConnect from "../../../config/dbConnect";
dbConnect();

const createToken = (id) => {
  return jwt.sign({ id, role: "user" }, process.env.JWT_SECRET_KEY);
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const passwordCheck = user.password == req.body.password;

      if (passwordCheck) {
        const token = createToken(user.id);
        const cookies = new Cookies(req, res);
        cookies.set("access-token", token);

        return res.status(200).json({ success: true });
      } else {
        return res
          .status(200)
          .json({ success: false, message: ["Incorrect password"] });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, message: ["Username does not exist"] });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(`Error: ${err}`);

    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return login(req, res);
    }

    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
