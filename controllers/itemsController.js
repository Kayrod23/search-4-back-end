const express = require("express");
const items = express.Router();
const { getAllItems, getItem, createItem, updateItem, deleteItem} = require("../queries/items.js");

items.get("/", async (req, res) => {
    const allItems = await getAllItems();
    if(!allItems.error) {
        res.status(200).json(allItems);
    } else {
        res.status(500).json({ error: "Server Error" })
    };
});

items.get("/:id", async (req, res) => {
    const {id} = req.params;
    const item = await getItem(id);
    if(item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ error: "Not Found" });
    };
});

items.post("/", async (req, res) => {
    try {
        const item = await createItem(req.body);
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: error });
    };
});

items.put("/:id", async (req, res) => {
    const {id} = req.params;
    const updatedItem = await updateItem(id, req.body);
    res.status(200).json(updatedItem);
})

items.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const deletedItem = await deleteItem(id);
    if(deletedItem.id) {
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json("Item Not Found!");
    };
});

module.exports = items;