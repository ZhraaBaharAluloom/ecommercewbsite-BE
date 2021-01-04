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
    const foundShop = await Shop.findOne({ where: { UserId: req.user.id } });
    if (!foundShop) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }

      req.body.UserId = req.user.id;
      const newShop = await Shop.create(req.body);
      res.status(201).json(newShop);
    } else {
      const err = new Error("You Can Not Have More Than One Shop");
      err.status = 403;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateShop = async (req, res, next) => {
  try {
    if (req.user.id === req.shop.UserId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }

      await req.shop.update(req.body);
      res.slug = req.body.name;
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

exports.deleteShop = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.shop.UserId) {
      await req.shop.destroy();
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
