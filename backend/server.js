import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json());
// allows us to accept JSON data in the req.body

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    // passing an empty object says to fetch all products we have in the database
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/api/products", async (req, res) => {
  // making the function async allows us to us the keyword 'await' later

  const product = req.body;
  // we get the product which the user will provide the information

  // specify requirements for the information needed for each product
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  // if any of the fields are not provided, then the response returns
  // an error message that says "Please provide all fields"

  const newProduct = new Product(product);
  // if the user passes the if statement above, then create a new Product
  // it follows the structure of Product from product.model.js
  // and takes in the information from product that we got from req.body

  // for try...catch blocks, code in the try block is executed first
  // any exceptions thrown in the try block then executes the catch block
  try {
    await newProduct.save(); // saves the newProduct to the database
    res.status(201).json({ success: true, data: newProduct });
    // says that something was successfully created
  } catch (error) {
    console.error("Error in Creating Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
  // so basically, we try and save the new Product to the database
  // if the try block returns an error in saving the new Product,
  // the catch block executes and logs the error message
});

app.put("/api/products/:id", async (req, res) => {
  // for updating product information
  const { id } = req.params;

  const product = req.body; // name, price, image

  // if an invalid object ID is passed,
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// To test if the POST request works without a frontend application,
// use Postman

app.delete("/api/products/:id", async (req, res) => {
  // when a product is created, it comes with an object ID
  const { id } = req.params;

  try {
    // passes in the id of the product and tries to find it in the database
    // if it finds it, then it deletes it
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log("Error in deleting product:", error.message);
    res.status(404).json({ success: false, message: "Product Not Found" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
