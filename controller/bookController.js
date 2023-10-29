const express = require("express");
const app = express();
const schema = require("../model/bookSchema");

exports.create_booking = async (req, res) => {
  let payload = req.body;

  try {
    let find_prev = await schema.find();

    console.log("re", req.user);

    let parseCarData = JSON.parse(payload.car_details);

    payload.car_id = parseCarData._id;
    payload.user_id = req.user.user.userid;

    console.log("payload", payload);

    await schema
      .create(payload)
      .then((user) => {
        return res.json({ message: "booking created successfully", user });
      })
      .catch((err) => {
        return res.json({
          message: "error while booking order",
          err,
        });
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getBookings = async (req, res) => {
  try {
    let findAll = await schema.find().populate(["user_id", "card_id"]);
    if (findAll.length > 0) {
      return res.status(200).json(findAll);
    } else {
      return res.status(400).json({
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
