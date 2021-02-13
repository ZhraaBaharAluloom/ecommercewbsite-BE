const Shop = require("./Shop");
const Pasta = require("./Pasta");
const User = require("./User");
const Comment = require("./Comment");

// Restaurant & Pastas
Shop.hasMany(Pasta, { as: "pastas", foreignKey: "shopId", allowNull: false });
Pasta.belongsTo(Shop, { as: "shop" });

// Vendors and Restaurants
User.hasOne(Shop);
Shop.belongsTo(User);

// Pastas and Comments
Pasta.hasMany(Comment, {
  as: "comments",
  foreignKey: "pastaId",
  allowNull: false,
});
Comment.belongsTo(Pasta);

module.exports = { Pasta, Shop, User, Comment };
