const db = require("../db/dbConfig.js");

const getAllItems = async () => {
    try {
        const allItems = await db.any("SELECT * FROM items");
        return allItems;
    } catch (error) {
        return {error: error};
    };
};

const getItem = async (id) => {
    try {
        const oneItem = await db.oneOrNone("SELECT * FROM items WHERE id=$1", id);
        return oneItem;
    } catch (error) {
        return {error: error};
    };
};

const createItem = async (item) => {
    try {
        const newItem = await db.one(
            "INSERT INTO items(name, image, cost, quantity, category, description, email) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [item.name, item.image, item.cost, item.quantity, item.category, item.description, item.email]
        );
        return newItem
    } catch (error) {
        console.error(error);
    };
};

const updateItem = async (id, item) => {
    try {
        const updatedItem = await db.one(
            "UPDATE items SET name=$1, image=$2, cost=$3, quantity=$4, category=$5, description=$6 WHERE id=$7 RETURNING *",
            [item.name, item.image, item.cost, item.quantity, item.category, item.description, id]
        );
        return updatedItem;
    } catch (error) {
        console.error(error);
    };
};

const deleteItem = async (id) => {
    try {
        const deletedItem = await db.one("DELETE FROM items WHERE id=$1 RETURNING *", [id]);
        return deletedItem; 
    } catch (error) {
        console.error(error);
    };
};

module.exports= {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
};