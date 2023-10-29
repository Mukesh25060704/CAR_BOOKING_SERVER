const mongoose = require("mongoose");
const carsSchema = new mongoose.Schema({
  car_name: String,
  uri: String,
  description: String,
  amenities: String,
  images: Array,
  car_id: String,
  car_color: String,
  car_price: String,
});
module.exports = mongoose.model("cars", carsSchema);
