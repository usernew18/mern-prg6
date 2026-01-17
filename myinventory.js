const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "inventorydb";
const collectionName = process.env.MONGODB_COLLECTION || "products";

let productsCollection;

async function connectToDatabase() {
  const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  console.log(`Connected to MongoDB at ${mongoUri}`);

  const db = client.db(dbName);
  productsCollection = db.collection(collectionName);
  await productsCollection.createIndex({ id: 1 }, { unique: true });

  const seedData = [
    { id: 1, prodname: "prod1", qty: 12, price: 12 },
    { id: 2, prodname: "prod2", qty: 1, price: 13 },
    { id: 3, prodname: "prod3", qty: 10, price: 14 },
    { id: 4, prodname: "prod4", qty: 19, price: 16 }
  ];

  const existingCount = await productsCollection.countDocuments();
  if (existingCount === 0) {
    await productsCollection.insertMany(seedData);
    console.log("Seeded MongoDB with default inventory records");
  }
}

function ensureCollectionReady(req, res, next) {
  if (!productsCollection) {
    return res.status(503).json({ message: "Database connection not ready" });
  }
  next();
}

app.use(ensureCollectionReady);

app.get("/", async (req, res) => {
  try {
    const inventory = await productsCollection.find({}).sort({ id: 1 }).toArray();
    res.json(inventory);
  } catch (error) {
    console.error("Failed to fetch inventory", error);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});

app.post("/add", async (req, res) => {
  const { id, prodname, qty, price } = req.body;
  if (id == null || !prodname || qty == null || price == null) {
    return res.status(400).json({ message: "id, prodname, qty, and price are required" });
  }

  const newProduct = {
    id: Number(id),
    prodname,
    qty: Number(qty),
    price: Number(price)
  };

  try {
    await productsCollection.insertOne(newProduct);
    console.log("New Product Added: ", newProduct);

    const inventory = await productsCollection.find({}).sort({ id: 1 }).toArray();
    res.status(201).json(inventory);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: `Product with id ${newProduct.id} already exists` });
    }
    console.error("Failed to add product", error);
    res.status(500).json({ message: "Failed to add product" });
  }
});

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(8000, () => {
      console.log("Express server running at http://localhost:8000");
    });
  } catch (error) {
    console.error("Unable to start server", error);
    process.exit(1);
  }
}

startServer();
