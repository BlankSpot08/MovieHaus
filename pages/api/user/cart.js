const ObjectId = require("mongodb").ObjectId;

import dbConnect from "../../../config/dbConnect";
const Cart = require("../../../models/Cart.js");
const jwt = require("jsonwebtoken");
import Cookies from "cookies";
dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const getCart = async (req, res) => {
  try {
    const cookies = new Cookies(req, res);

    const token = cookies.get("access-token");

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const cart = await Cart.findById(user.id)

    return res.status(200).json({ success: true, value: cart });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const addCart = async (req, res) => {
  try {
    console.log(req.body)
    // const cookies = new Cookies(req, res);

    // const token = cookies.get("access-token");

    // const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // const cart = new Cart()

    // console.log(cart)

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const updateCart = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const deleteCart = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getCart(req, res);
    }

    case "POST": {
      return addCart(req, res);
    }

    case "PUT": {
      return updateCart(req, res);
    }

    case "DELETE": {
      return deleteCart(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
