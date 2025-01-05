import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.post("/products", async (req, res) => {
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

// To test if the POST request works without a frontend application,
// use Postman

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
