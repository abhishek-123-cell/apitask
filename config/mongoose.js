const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/api-Task");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error in connecting Db"));
db.once("open", function () {
  console.log("sucessfully connected to database::MONGODb ");
});
module.exports = db;
