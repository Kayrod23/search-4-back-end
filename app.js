const express = require("express");
const cors = require("cors")
const app = express();
const itemsController = require("./controllers/itemsController.js")

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to Search4");
});

app.use("/items", itemsController);

app.get("*", (req, res) => {
    res.status(404).json({error: "Not Found"});
});

module.exports = app;