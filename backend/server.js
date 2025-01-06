import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);
// we create one route for products
// then we call product.route.js which checks which request it is
// with the given id and request, it calls the respective function
// within the controllers folder and executes

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
