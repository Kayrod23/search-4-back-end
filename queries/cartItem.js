const db = require("../db/dbConfig.js");

const getAllCartItem = async () => {
    try {
        const allCartItem = await db.any("SELECT * FROM (items JOIN cart ON items.id = cart.item_id)");
        return allCartItem;
    } catch (error) {
        return {error: error};
    };
};

const getCartItem = async (id) => {
    try {
        const oneCartItem = await db.oneOrNone("SELECT * FROM (items JOIN cart ON items.id = cart.item_id) WHERE cart.id=$1", id);
        return oneCartItem;
    } catch (error) {
        return {error: error};
    };
};

const createCartItem = async () => {
    try {
        const newCartItem = await db.one(
            "INSERT INTO (items JOIN cart ON items.id = cart.item_id) (name, image, cost, quantity, category, description) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [CartItem.name, CartItem.image, CartItem.cost, CartItem.owner, CartItem.category, CartItem.description]
        );
        newCartItem;
    } catch (error) {
        console.error(error);
    };
};

const updateCartItem = async (id) => {
    try {
        const updatedCartItem = await db.one(
            "UPDATE CartItem SET name=$1, image=$2, cost=$3, quantity=$5, category=$6, description=$7 WHERE id=$8 RETURNING *",
            [CartItem.name, CartItem.image, CartItem.cost, CartItem.owner, CartItem.category, CartItem.description, id]
        );
        return updatedCartItem;
    } catch (error) {
        console.error(error);
    };
};

const deleteCartItem = async (id) => {
    try {
        const deletedCartItem = await db.one("DELETE FROM CartItem WHERE id=$1 RETURNING *", [id]);
        return deletedCartItem; 
    } catch (error) {
        console.error(error);
    };
};

module.exports= {
    getAllCartItem,
    getCartItem,
    createCartItem,
    updateCartItem,
    deleteCartItem,
};