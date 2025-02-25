import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import apiRoute from "./Routes/apiRouter.js";
import contactRouter from "./Routes/contactRouter.js";

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
