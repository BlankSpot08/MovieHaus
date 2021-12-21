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

const getTicket = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};
const addTicket = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};
const updateTicket = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};
const deleteTicket = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getTicket(req, res);
    }

    case "POST": {
      return addTicket(req, res);
    }

    case "PUT": {
      return updateTicket(req, res);
    }

    case "DELETE": {
      return deleteTicket(req, res);
    }
    default: {
      res.status(400).json({ sucess: false });
    }
  }
}
