import express from "express";
import path from "path";
import cors from "cors";
import apiRoute from "./Routes/apiRouter.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", apiRoute);

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port} ✅`);
});
