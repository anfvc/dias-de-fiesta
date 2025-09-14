import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import wwhatsappRouter from "./Routes/whatsppRouter.js";
import contactRouter from "./Routes/contactRouter.js";
import userRouter from "./Routes/userRouter.js";

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use("/", wwhatsappRouter);
app.use("/api", contactRouter);
app.use("/api/admin", userRouter)

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port} ✅`);
});
