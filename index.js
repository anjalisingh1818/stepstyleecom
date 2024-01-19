import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authroute from "./routes/authroute.js";
import productroute from "./routes/productroute.js";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(cors());
app.use("/api/v1/auth", authroute);
app.use("/api/v1/shoe", productroute);

app.get("*", (req, res) => {
  res.send("Page not found");
});
connectDB();
const PORT = process.env.PORT;

app.listen(PORT);
