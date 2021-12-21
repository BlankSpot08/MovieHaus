const ObjectId = require("mongodb").ObjectId;
const dbConnect = require("../../config/dbConnect");
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
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};
const addCart = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};
const updateCart = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};
const deleteCart = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
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
      res.status(400).json({ sucess: false });
    }
  }
}
