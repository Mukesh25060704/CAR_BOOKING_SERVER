const controller = require("../controller/carsController");
const express = require("express");
const validatetoken = require("../middleware/validatetokenhandler");

const car_router = express.Router();

car_router.post("/create-cars", controller.create_cars);
car_router.get("/get-cars", controller.get_cars);
car_router.post("/getone-car", controller.get_one_car);

module.exports = car_router;
