const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
} = require("../controller/product");

router.post("/product/create/", create);
router.get("/product/:productId", read);
router.delete(
  "/product/:productId",

  remove
);
router.put(
  "/product/:productId",

  update
);

router.param("productId", productById);

module.exports = router;
