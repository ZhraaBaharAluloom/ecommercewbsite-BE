const express = require("express");
const { Passport } = require("passport");
const passport = require("passport");
const router = express.Router();
const {
  pastaList,
  updatePasta,
  deletePasta,
  fetchPasta,
  createComment,
} = require("../controllers/pastaController");

// Middleware
const upload = require("../middleware/multer");

router.param("pastaId", async (req, res, next, pastaId) => {
  const pasta = await fetchPasta(pastaId, next);
  if (pasta) {
    req.pasta = pasta;
    next();
  } else {
    const err = new Error("Pasta Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", pastaList);

router.delete(
  "/:pastaId",
  passport.authenticate("jwt", { session: false }),
  deletePasta
);

router.post(
  "/:pastaId/comment",
  passport.authenticate("jwt", { session: false }),
  createComment
);

router.put(
  "/:pastaId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updatePasta
);

module.exports = router;
