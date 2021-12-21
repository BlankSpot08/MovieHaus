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

const getHome = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const addHome = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const updateHome = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const deleteHome = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getHome(req, res);
    }

    case "POST": {
      return addHome(req, res);
    }

    case "PUT": {
      return updateHome(req, res);
    }

    case "DELETE": {
      return deleteHome(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
