const { Pasta, Shop } = require("../db/models");

exports.fetchPasta = async (pastaId, next) => {
  try {
    const pasta = await Pasta.findByPk(pastaId);
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

exports.updatePasta = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    await req.pasta.update(req.body);
    res.slug = req.body.name;
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.deletePasta = async (req, res, next) => {
  try {
    await req.pasta.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
