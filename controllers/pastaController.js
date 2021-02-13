const { Pasta, Shop, Comment, User } = require("../db/models");

exports.fetchPasta = async (pastaId, next) => {
  try {
    const pasta = await Pasta.findByPk(pastaId, {
      include: {
        model: Shop,
        as: "shop",
        attributes: ["UserId"],
      },
    });
    return pasta;
  } catch (error) {
    next(error);
  }
};

exports.pastaList = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const pastas = await Pasta.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Shop,
        as: "shop",
        attributes: ["name"],
      },
    });
    res.json(pastas);
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    req.body.username = user.username;
    req.body.pastaId = req.pasta.id;
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

exports.updatePasta = async (req, res, next) => {
  try {
    if (req.user.id === req.pasta.shop.UserId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }

      await req.pasta.update(req.body);

      res.slug = req.body.name;
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.deletePasta = async (req, res, next) => {
  try {
    if (req.user.id === req.pasta.shop.UserId) {
      await req.pasta.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
