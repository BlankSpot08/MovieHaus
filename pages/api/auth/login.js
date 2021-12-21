const ObjectId = require("mongodb").ObjectId;
import dbConnect from "../../../config/dbConnect";
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

const getLogin = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const addLogin = async (req, res) => {
  try {
    console.log("HEllo");
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const updateLogin = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const deleteLogin = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getLogin(req, res);
    }

    case "POST": {
      return addLogin(req, res);
    }

    case "PUT": {
      return updateLogin(req, res);
    }

    case "DELETE": {
      return deleteLogin(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
