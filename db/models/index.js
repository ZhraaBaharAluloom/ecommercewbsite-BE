const Shop = require("./Shop");
const Pasta = require("./Pasta");
const User = require("./User");

//Each shop has many pastas
Shop.hasMany(Pasta, { as: "pastas", foreignKey: "shopId", allowNull: false });

// Each pasta belongs to one shop
Pasta.belongsTo(Shop, { as: "shop" });

// Each user can have one shop only
User.hasOne(Shop);
// A shop belongs to one user only
Shop.belongsTo(User);

module.exports = { Pasta, Shop, User };
