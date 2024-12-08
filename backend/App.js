var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
const multer = require("multer");
var path = require('path');

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");

// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "coms3190Final";
const client = new MongoClient(url);
const db = client.db(dbName);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/dishes", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    const query = {};
    const results = await db
    .collection("dishes")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);

    res.status(200);
    res.send(results);
});

