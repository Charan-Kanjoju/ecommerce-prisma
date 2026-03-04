import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import productRoutes from "./modules/product/product.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cartRoutes from "./modules/cart/cart.routes";
import orderRoutes from "./modules/order/order.routes";

dotenv.config();

const app = express();


app.get("/",(_, res) => {
  res.send("E-commerce API is running");
});
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});