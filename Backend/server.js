import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import apiRoute from "./Routes/apiRouter.js";
import contactRouter from "./Routes/contactRouter.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRoute);
app.use("/api", contactRouter);

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port} ✅`);
});
