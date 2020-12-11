const express = require("express");
const router = express.Router();
const {
  pastaList,
  updatePasta,
  deletePasta,
  fetchPasta,
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

router.delete("/:pastaId", deletePasta);

router.put("/:pastaId", upload.single("image"), updatePasta);

module.exports = router;
