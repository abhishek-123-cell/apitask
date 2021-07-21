const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../model/product");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not find",
      });
    }
    req.product = product;
    next();
  });
};
exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be loaded",
      });
    }
    const {
      ProductName,
      unitPrice,
      category,
      qtyPerUnit,
      photo,
      unitInstock,
      discontinued,
    } = fields;
    if (
      !ProductName ||
      !unitPrice ||
      !category ||
      !qtyPerUnit ||
      !photo ||
      !unitInstock ||
      !discontinued
    ) {
      return res.status(400).json({
        error: "All fields must be required",
      });
    }
    let product = new Product(fields);
    if (files.photo) {
      console.log("Files Photo", files.photo);
      if (files.photo.size > 5000000) {
        return res.status(400).json({
          error: "Image should be less than 5 mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be loaded",
      });
    }
    const {
      ProductName,
      unitPrice,
      category,
      qtyPerUnit,
      photo,
      unitInstock,
      discontinued,
    } = fields;
    if (
      !ProductName ||
      !unitPrice ||
      !category ||
      !qtyPerUnit ||
      !photo ||
      !unitInstock ||
      !discontinued
    ) {
      return res.status(400).json({
        error: "All fields must be required",
      });
    }
    let product = req.product;

    product = _.extend(product, fields);

    if (files.photo) {
      console.log("Files Photo", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1 mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      deletedProduct, //it show whole data
      message: "product deleted successfully",
    });
  });
};
