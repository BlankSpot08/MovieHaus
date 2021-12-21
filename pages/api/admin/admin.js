const ObjectId = require("mongodb").ObjectId;
const dbConnect = require("../../../config/dbConnect");
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
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const addAdmin = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const updateAdmin = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
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
