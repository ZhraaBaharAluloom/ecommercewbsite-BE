const express = require("express");
const passport = require("passport");
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

router.delete(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  deleteShop
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createShop
);

router.post("/:shopId/pastas", upload.single("image"), createPasta);

router.put(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateShop
);

module.exports = router;
