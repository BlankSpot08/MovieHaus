const { connectToDatabase } = require("../../config/mongodb");
const ObjectId = require("mongodb").ObjectId;
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
