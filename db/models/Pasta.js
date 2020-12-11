const { Model, DataTypes } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const db = require("../db");

class Pasta extends Model {}

Pasta.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: {
          args: 5,
          msg: "Minimum Price Is 5",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Pasta, {
  source: ["name"],
});

module.exports = Pasta;
