var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
const multer = require("multer");
var path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

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
const upload = multer({ storage: storage });

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

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

app.post("/dish", upload.single("image"), async (req, res) => {
    try {
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const newDocument = {
            "dish": req.body.dish,
            "price": req.body.price,
            "type": req.body.type,
            "restaurant": req.body.restaurant,
            "location": req.body.location,
            "url": imageUrl
        };

        console.log(newDocument);
        
        const results = await db
        .collection("dishes")
        .insertOne(newDocument);

        res.status(200);
        res.send(results);
        
    } 
    catch (err) {
        // Handle synchronous errors
        console.error("Error in POST /dish:", err);
        res.status(500).send({ error: "An unexpected error occurred: " + err.message });
        }
});