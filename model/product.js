const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    productId: {},

    unitPrice: {
      type: Number,
      trim: true,
      maxlength: 32,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    category: {
      type: ObjectId,
      ref: "Category",

      required: true,
    },
    qtyPerUnit: {
      type: Number,
    },

    unitInstock: {
      type: Number,
    },
    discontinued: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
