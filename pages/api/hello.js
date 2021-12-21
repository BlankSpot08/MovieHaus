const ObjectId = require("mongodb").ObjectId;
const dbConnect = require("../../config/dbConnect");
dbConnect();

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
