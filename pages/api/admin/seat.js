const ObjectId = require("mongodb").ObjectId;

const MovieSeat = require("../../../models/MovieSeat.js");

import dbConnect from "../../../config/dbConnect";
dbConnect();

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "255mb",
        },
    },
};

const getSeat = async (req, res) => {
    try {
        const seats = await MovieSeat.find({})

        return res.status(200).json({ success: true, value: seats });
    } catch (err) {
        return res.status(401).json({ success: false, message: [] });
    }
};

const addSeat = async (req, res) => {
    try {
        const seats = new MovieSeat(req.body)
        const temp = await seats.save()

        return res.status(200).json({ success: true, message: [] });
    } catch (err) {
        return res.status(401).json({ success: false, message: [] });
    }
};

const updateSeat = async (req, res) => {
    try {
        const { id } = req.body

        const movieSeat = await MovieSeat.findOneAndUpdate(
            { _id: ObjectId(id) },
            req.body,
            { upsert: false }
        );

        if (!movieSeat) {
            return res
                .status(200)
                .json({ success: false, message: ["Seats not found"] });
        }

        return res.status(200).json({ success: true, message: ["Seats was updated successfully."] });
    } catch (err) {
        return res.status(401).json({ success: false, message: [] });
    }
};

const deleteSeat = async (req, res) => {
    try {
        const { id } = req.body

        const movieSeat = await MovieSeat.findOne({ id: ObjectId(id) })
        movieSeat.remove()

        return res.status(200).json({ success: true, message: ['Delete successfully'] });
    } catch (err) {
        return res.status(401).json({ success: false, message: [] });
    }
};

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            return getSeat(req, res);
        }
        case "POST": {
            return addSeat(req, res);
        }
        case "PUT": {
            return updateSeat(req, res);
        }
        case "DELETE": {
            return deleteSeat(req, res);
        }
    }
}