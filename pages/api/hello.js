const dbConnect = require("../../config/dbConnect");
const ObjectId = require("mongodb").ObjectId;
dbConnect();

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
