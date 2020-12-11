const { Shop, Pasta } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Pasta,
          as: "pastas",
          attributes: ["id"],
        },
      ],
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.createShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.updateShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    await req.shop.update(req.body);
    res.slug = req.body.name;
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.deleteShop = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.createPasta = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.shopId = req.shop.id;
    const newPasta = await Pasta.create(req.body);
    res.status(201).json(newPasta);
  } catch (error) {
    next(error);
  }
};
