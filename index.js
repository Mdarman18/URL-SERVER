// -=========import importent files-=================
import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./src/connections/connections.js";
import new2 from "./src/routes/routes.js";
dotenv.config();
const port = process.env.PORT || 3100;

// --=============connection to db-==================
await connectDB();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import cors from "cors";
// --- CORS setup ---
app.use(
  cors({
    origin: "https://url-frontend-ashen.vercel.app/",
    credentials: true,
  })
);

// -=========routes-=====================
app.get("/", (req, res) => {
  res.send("success");
});
app.use("/api", new2);
// app.listen(port)
export default app;
