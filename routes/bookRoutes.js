const controller = require("../controller/bookController");
const express = require("express");
const validatetoken = require("../middleware/validatetokenhandler");
const book_router = express.Router();

book_router.post("/create-booking", validatetoken, controller.create_booking);
book_router.get("get-bookings", validatetoken, controller.getBookings);

module.exports = book_router;
