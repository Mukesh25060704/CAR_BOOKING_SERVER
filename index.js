require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");

const user_router = require("./routes/userRoutes");
const book_router = require("./routes/bookRoutes");
const car_router = require("./routes/carRoutes");
app.use(express.json());
app.use(cors());
db;

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", user_router);
app.use("/booking", book_router);
app.use("/cars", car_router);

app.listen(process.env.PORT, function () {
  console.log(`App listen at port ${process.env.PORT}`);
});
