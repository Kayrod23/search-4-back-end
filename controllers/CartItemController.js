const express = require("express");
const cartItem = express.Router();
const { getAllCartItem, getCartItem, createCartItem, updateCartItem, deleteCartItem} = require("../queries/cartItem.js");

cartItem.get("/", async (req, res) => {
    const allCartItem = await getAllCartItem();
    if(!allCartItem.error) {
        res.status(200).json(allCartItem);
    } else {
        res.status(500).json({ error: "Server Error" })
    };
});

cartItem.get("/:id", async (req, res) => {
    const {id} = req.params;
    const cartItem = await getCartItem(id);
    if(cartItem) {
        res.status(200).json(cartItem);
    } else {
        res.status(404).json({ error: "Not Found" });
    };
});

cartItem.post("/", async (req, res) => {
    try {
        const cartItem = await createCartItem(req.body);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(400).json({ error: error });
    };
});

cartItem.put("/:id", async (req, res) => {
    const {id} = req.params;
    const updatedCartItem = await updateCartItem(id, req.body);
    res.status(200).json(updatedCartItem);
})

cartItem.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const deletedCartItem = await deleteCartItem(id);
    if(deletedCartItem.id) {
        res.status(200).json(deletedCartItem);
    } else {
        res.status(404).json("cartItem Not Found!");
    };
});

module.exports = cartItem;