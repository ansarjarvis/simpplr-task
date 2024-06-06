import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import movieRouter from "./routes/movie.js";
import searchRouter from "./routes/search.js";
import filterRouter from "./routes/filter.js";

/* configuration */

dotenv.config();
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* Routes */

app.use("/api/movie", movieRouter);
app.use("/api/search", searchRouter);
app.use("/api/filter", filterRouter);

/* Database Setup */

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
