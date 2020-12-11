const express = require("express");
const router = express.Router();
const {
  shopList,
  createShop,
  updateShop,
  deleteShop,
  fetchShop,
  createPasta,
} = require("../controllers/shopController");

// Middleware
const upload = require("../middleware/multer");

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Shop Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", shopList);

router.delete("/:shopId", deleteShop);

router.post("/", upload.single("image"), createShop);

router.post("/:shopId/pastas", upload.single("image"), createPasta);

router.put("/:shopId", upload.single("image"), updateShop);

module.exports = router;
