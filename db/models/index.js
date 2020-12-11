const Shop = require("./Shop");
const Pasta = require("./Pasta");
const User = require("./User");

//Each shop has many pastas
Shop.hasMany(Pasta, { as: "pastas", foreignKey: "shopId", allowNull: false });

// Each pasta belongs to one shop
Pasta.belongsTo(Shop, { as: "shop" });

module.exports = { Pasta, Shop, User };
