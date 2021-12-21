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

const getLogin = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const addLogin = async (req, res) => {
  try {
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
