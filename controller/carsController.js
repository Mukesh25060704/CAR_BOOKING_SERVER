const express = require("express");
const app = express();
const schema = require("../model/carSchema");

exports.create_cars = async (req, res) => {
  let payload = req.body;

  //   let payload = [
  //     {
  //       car_name: "BMW X3 xDrive M40i",
  //       uri: "https://autohexa.com/wp-content/uploads/2023/06/2024-BMW-X3.jpg",
  //       description:
  //         "The SUV has a seating capacity of five occupants.The BMW X3 features a large kidney grille, adaptive LED headlamps, new dual tailpipes, tweaked front and rear bumpers, and two-piece LED tail lights.",
  //       amenities: "Amenities",
  //       images: [
  //         "https://di-uploads-pod24.dealerinspire.com/bmwofgwinnettplace/uploads/2020/04/The-luxurious-interior-inside-a-2020-BMW-X3.jpg",
  //         "https://imgd.aeplcdn.com//642x361//n/cw/ec/143891/bmw-x3-dashboard3.jpeg?isig=0&wm=1&q=75",
  //         "https://content.hellovieweas /1056x660/n/cw/ec/110503/x3-interior-gear-shifter-gear-shifter-stalk.jpeg?isig=0&q=80",
  //       ],
  //     },
  //     {
  //       car_name: "BMW X3 xDrive M40i",
  //       uri: "https://autohexa.com/wp-content/uploads/2023/06/2024-BMW-X3.jpg",
  //       description:
  //         "The SUV has a seating capacity of five occupants.The BMW X3 features a large kidney grille, adaptive LED headlamps, new dual tailpipes, tweaked front and rear bumpers, and two-piece LED tail lights.",
  //       amenities: "Amenities",
  //       images: [
  //         "https://di-uploads-pod24.dealerinspire.com/bmwofgwinnettplace/uploads/2020/04/The-luxurious-interior-inside-a-2020-BMW-X3.jpg",
  //         "https://imgd.aeplcdn.com//642x361//n/cw/ec/143891/bmw-x3-dashboard3.jpeg?isig=0&wm=1&q=75",
  //         "https://content.helloviewer.io/1920/64cb2c4ef0b09fe29105feb4/c77e521c-024c-40d8-9686-0c6ab36ade5b/slot/1.jpg",
  //         "https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/110503/x3-interior-gear-shifter-gear-shifter-stalk.jpeg?isig=0&q=80",
  //       ],
  //     },
  //   ];

  try {
    let find_prev = await schema.find();

    for (let i = 0; i < payload.length; i++) {
      const element = payload[i];
      element.car_id = `car-${find_prev.length + i}`;
    }

    await schema
      .insertMany(payload)
      .then((user) => {
        return res.json({ message: "cars created successfully", user });
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

exports.get_cars = async (req, res) => {
  try {
    let getAllcars = await schema.find();

    if (getAllcars.length > 0) {
      return res.status(200).json({
        message: "Cars Fetched successfully",
        data: getAllcars,
      });
    } else {
      return res.status(404).json({
        message: "No cars found",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.get_one_car = async (req, res) => {
  try {
    let { id } = req.body;
    let getAllcars = await schema.find({ _id: id });

    if (getAllcars.length > 0) {
      return res.status(200).json({
        message: "Cars Fetched successfully",
        data: getAllcars,
      });
    } else {
      return res.status(404).json({
        message: "No cars found",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
