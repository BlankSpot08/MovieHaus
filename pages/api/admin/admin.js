const ObjectId = require("mongodb").ObjectId;
const Admin = require("../../../models/Admin.js");

import dbConnect from "../../../config/dbConnect";
dbConnect();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "255mb",
    },
  },
};

const getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();

    return res.status(200).json({ success: true, value: admins });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

const addAdmin = async (req, res) => {
  try {
    if (req.body.password_confirmation != req.body.password) {
      return res.status(200).json({
        success: false,
        message: ["Confirm password is not the same as password"],
      });
    }
    const admin = new Admin(req.body);
    const new_admin = await admin.save();

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
      } else if (err.message.includes("username")) {
        return res
          .status(200)
          .send({ succes: false, message: ["Username already exist!"] });
      }
      return res
        .status(200)
        .send({ succes: false, message: ["Email already exist!"] });
    }
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.query;

    const admin = await Admin.findOneAndUpdate(
      { _id: ObjectId(id) },
      req.body,
      { upsert: false }
    );

    if (!admin) {
      return res
        .status(200)
        .json({ success: false, message: ["Admin not found"] });
    }

    return res
      .status(200)
      .json({ success: true, message: ["Admin was updated successfully."] });
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

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.query;

    const findBook = await Admin.findOne({ _id: ObjectId(id) });

    if (!findBook) {
      return res
        .status(200)
        .json({ success: true, message: ["Admin was not found."] });
    }

    findBook.remove();

    return res
      .status(200)
      .json({ success: true, message: ["Admin was deleted successfully"] });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res
      .status(401)
      .json({ success: false, message: ["Admin was deleted unsuccessfully"] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getAdmin(req, res);
    }

    case "POST": {
      return addAdmin(req, res);
    }

    case "PUT": {
      return updateAdmin(req, res);
    }

    case "DELETE": {
      return deleteAdmin(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
