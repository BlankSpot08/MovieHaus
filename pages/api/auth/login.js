const ObjectId = require("mongodb").ObjectId;
const dbConnect = require("../../../config/dbConnect");
const User = require('../../../models/User.js')

dbConnect();
/*

import Cookies from "cookies";
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET_KEY);
};
const token = createToken(findAdmin.id);
const cookies = new Cookies(req, res);
*/

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const login = async (req, res) => {
  try {

    const user = User.find(
      {
        username: ''
      }
    )


    return res.status(200).json({ success: true });
  } catch (err) {
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
