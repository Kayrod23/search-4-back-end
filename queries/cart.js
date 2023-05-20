const db = require("../db/dbConfig.js");

const getAllCart = async () => {
    try {
        const allCart = await db.any("SELECT * FROM cart");
        return allCart;
    } catch (error) {
        return {error: error};
    };
};

const getCart = async (id) => {
    try {
        const oneCart = await db.oneOrNone("SELECT * FROM cart WHERE id=$1", id);
        return oneCart;
    } catch (error) {
        return {error: error};
    };
};

const createCart = async () => {
    try {
        const newCart = await db.one(
            "INSERT INTO cart(name, image, cost, quantity, category, description) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [cart.name, cart.image, cart.cost, cart.owner, cart.category, cart.description]
        );
        return newCart;
    } catch (error) {
        console.error(error);
    };
};

const updateCart = async (id) => {
    try {
        const updatedCart = await db.one(
            "UPDATE cart SET name=$1, image=$2, cost=$3, quantity=$5, category=$6, description=$7 WHERE id=$8 RETURNING *",
            [cart.name, cart.image, cart.cost, cart.owner, cart.category, cart.description, id]
        );
        return updatedCart;
    } catch (error) {
        console.error(error);
    };
};

const deleteCart = async (id) => {
    try {
        const deletedCart = await db.one("DELETE FROM cart WHERE id=$1 RETURNING *", [id]);
        return deletedCart; 
    } catch (error) {
        console.error(error);
    };
};

module.exports= {
    getAllCart,
    getCart,
    createCart,
    updateCart,
    deleteCart,
};