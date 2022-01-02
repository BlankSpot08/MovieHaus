const ObjectId = require("mongodb").ObjectId;

import dbConnect from "../../../config/dbConnect";
const Cart = require("../../../models/Cart.js");
const Movie = require("../../../models/Movie.js");
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
    // console.log(req.body)

    // console.log(req.body.movie_date)

    const cookies = new Cookies(req, res);

    const token = cookies.get("access-token");

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const cart = new Cart()
    cart.markModified('movie_date')
    cart.user_id = user.id
    cart.movie_title = req.body.movie_title
    cart.movie_release_date = req.body.movie_release_date
    cart.temp = req.body.movie_date
    cart.movie_seats = req.body.movie_seats
    cart.qr_code = ""

    console.log(cart)
    const tempCart = await cart.save()

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
