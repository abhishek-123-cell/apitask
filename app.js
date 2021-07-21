const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// import db from config file
const db = require("./config/mongoose");

// import routes
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// app
const app = express();

// middlewares

app.use(bodyParser.json());
app.use(cookieParser());

////excess routes

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port = 8006;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
