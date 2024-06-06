import express from "express";
import { filterMovies } from "../controllers/filter.js";

let router = express.Router();

router.get("/", filterMovies);

export default router;
