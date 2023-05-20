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

const createItem = async () => {
    try {
        const newItem = await db.one(
            "INSERT INTO items(name, image, cost, quantity, category, description) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [item.name, item.image, item.cost, item.owner, item.category, item.description]
        );
    } catch (error) {
        console.error(error);
    };
};
//owner,
const updateItem = async (id) => {
    try {
        const updatedItem = await db.one(
            "UPDATE items SET name=$1, image=$2, cost=$3, quantity=$5, category=$6, description=$7 WHERE id=$8 RETURNING *",
            [item.name, item.image, item.cost, item.owner, item.category, item.description, id]
        );
        return updatedItem;
    } catch (error) {
        console.error(error);
    };
};
//owner=$4,
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