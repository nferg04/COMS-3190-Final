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

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).send({error: "Username and password are required." });
        }

        const query = {username: username}
        const results = await db.collection("users")
        .findOne(query);
        console.log("Results :", results);
        if (err) {
            console.error("Database error during login:", err);
            return res.status(500).send({ error: "An error occurred in Query. Please try again." });
        }
        if (results.length === 0) {
            return res.status(401).send({ error: "Invalid username or password." });
        }
        // If there is not any error, respond with code and role
        const { user } = results[0];
        res.status(200).send({ user });
    }
    catch (err) {
        // Handle synchronous errors
        console.error("Error in GET /contact/login", err);
        res.status(500).send({ error: "An unexpected error occurred in Login: " + err.message });
    }
});

app.post("/user", async (req, res) => {
        
    console.log(req.body);

    const newDocument = {
        "username": req.body.username,
        "password": req.body.password
    };

    console.log(newDocument);

    if(!req.body.username || !req.body.password) {
        return res.status(400).send({error: "Username and password are required." });
    }

    const query = {username: req.body.username}
    const results = await db.collection("users")
    .findOne(query);
    
    if(results == null) {
        const result = await db
        .collection("users")
        .insertOne(newDocument);

        res.status(200);
        res.send(result);
    }
    else {
        return res.status(400).send( { error: "Username already exists try something else." })
    }
});