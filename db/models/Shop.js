const { Model, DataTypes } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const db = require("../db");

class Shop extends Model {}

Shop.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    // pasta: {
    //   type: DataTypes.STRING,
    // },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Shop, {
  source: ["name"],
});

module.exports = Shop;
