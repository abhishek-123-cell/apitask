const express = require("express");
const router = express.Router();

const {
  create,
  categoryById,
  read,
  remove,
  update,
  list,
} = require("../controller/category");

//routes access
router.param("categoryId", categoryById);

router.post("/category/create/", create);
router.get("/category/read", read);
// router.put("/category/:categoryUpdateId/:categoryId", update);
router.put("/category/update", update);

router.delete("/category/create/:categoryId", remove);
router.get("categories", list);

module.exports = router;
