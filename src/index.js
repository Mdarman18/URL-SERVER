// // -=========import importent files-=================
// import express from "express";
// const app = express();
// import dotenv from "dotenv";
// import connectDB from "./connections/connections.js";
// import new2 from "./routes/routes.js";
// dotenv.config();
// const port = process.env.PORT || 3100;

// // --=============connection to db-==================
// connectDB();
// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// import cors from "cors";
// // --- CORS setup ---
// app.use(
//   cors({
//     origin: "https://url-frontend-joyx.vercel.app/", // allow all origins, works for Vercel frontend
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // include OPTIONS for preflight
//     allowedHeaders: ["Content-Type", "Authorization"], // allow common headers
//   })
// );

// // Handle preflight OPTIONS requests
// app.options("*", cors());

// // -=========routes-=====================
// app.get("/", (req, res) => {
//   res.send("success");
// });
// app.use("/api", new2);
// // app.listen(port, () => {
// //   console.log(`running ${port}`);
// // });
import express from "express";
import connectDB from "./connections/connections.js";
import new2 from "./routes/routes.js";
import microCors from "micro-cors";

const app = express();

// ✅ CORS for all origins
const cors = microCors({
  origin: "*",
  allowMethods: ["GET","POST","PUT","DELETE","OPTIONS"],
});

// ✅ Connect MongoDB (singleton)
await connectDB(); 

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

// ✅ Routes
app.get("/", (req, res) => res.send("success"));
app.use("/api", new2);

// ✅ Export app (no app.listen for serverless)
export default app;
