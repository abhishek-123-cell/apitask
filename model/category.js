const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    id: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
