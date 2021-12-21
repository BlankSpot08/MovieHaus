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

const getRegister = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const addRegister = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const updateRegister = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};
const deleteRegister = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false, message: [] });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getRegister(req, res);
    }

    case "POST": {
      return addRegister(req, res);
    }

    case "PUT": {
      return updateRegister(req, res);
    }

    case "DELETE": {
      return deleteRegister(req, res);
    }
    default: {
      res.status(400).json({ sucess: false, message: [] });
    }
  }
}
