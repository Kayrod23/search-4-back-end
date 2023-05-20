const express = require("express");
const cart = express.Router();
const { getAllCart, getCart, createCart, updateCart, deleteCart} = require("../queries/cart.js");

cart.get("/", async (req, res) => {
    const allCart = await getAllCart();
    if(!allCart.error) {
        res.status(200).json(allCart);
    } else {
        res.status(500).json({ error: "Server Error" })
    };
});

cart.get("/:id", async (req, res) => {
    const {id} = req.params;
    const cart = await getCart(id);
    if(cart) {
        res.status(200).json(cart);
    } else {
        res.status(404).json({ error: "Not Found" });
    };
});

cart.post("/", async (req, res) => {
    try {
        const cart = await createCart(req.body);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error });
    };
});

cart.put("/:id", async (req, res) => {
    const {id} = req.params;
    const updatedCart = await updateCart(id, req.body);
    res.status(200).json(updatedCart);
})

cart.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const deletedCart = await deleteCart(id);
    if(deletedCart.id) {
        res.status(200).json(deletedCart);
    } else {
        res.status(404).json("cart Not Found!");
    };
});

module.exports = cart;