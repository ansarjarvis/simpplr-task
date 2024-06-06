import express from "express";
import { geSearchMovie } from "../controllers/search.js";

let router = express.Router();

router.get("/", geSearchMovie);

export default router;
