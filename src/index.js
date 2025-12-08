// -=========import importent files-=================
import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./connections/connections.js";
import new2 from "./routes/routes.js";
dotenv.config({ path: "../.env" });
const port = process.env.PORT || 3100;

// --=============connection to db-==================
connectDB();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import cors from "cors";
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // if sending cookies
}));

// -=========routes-=====================
app.get("/", (req, res) => {
  res.send("success");
});
app.use("/api", new2);
app.listen(port, () => {
  console.log(`running ${port}`);
});
