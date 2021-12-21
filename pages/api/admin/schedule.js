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

const getSchedule = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};
const addSchedule = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};
const updateSchedule = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};
const deleteSchedule = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getSchedule(req, res);
    }

    case "POST": {
      return addSchedule(req, res);
    }

    case "PUT": {
      return updateSchedule(req, res);
    }

    case "DELETE": {
      return deleteSchedule(req, res);
    }
    default: {
      res.status(400).json({ sucess: false });
    }
  }
}
