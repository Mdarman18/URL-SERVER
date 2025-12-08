import express from "express";
import HandleUrl, { HandleDetalis, HandleRequest } from "../controllers/index.js";
const new2 = express.Router();
new2.post("/home", HandleUrl);
new2.get("/:shortId", HandleRequest);
new2.get("/detalis/:shortId", HandleDetalis);
export default new2;
