import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import wwhatsappRouter from "./Routes/whatsppRouter.js";
import contactRouter from "./Routes/contactRouter.js";
import userRouter from "./Routes/userRouter.js";
import eventRouter from "./Routes/eventRouter.js";
import photoRouter from "./Routes/photoRouter.js";
import testimonialRouter from "./Routes/testimonialRouter.js";
import connection from "./Database/database.js";
import cookieParser from "cookie-parser";

await connection();

const app = express();

app.use(express.json());

app.use(cookieParser());

const defaultOrigins = ["http://localhost:5174", "http://localhost:5173"];
let allowedOrigins = defaultOrigins;

if (process.env.FRONTEND_URL) {
  allowedOrigins = [...new Set([...defaultOrigins, process.env.FRONTEND_URL])];
}

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);
app.use(bodyParser.json());

app.use("/", wwhatsappRouter);
app.use("/api", contactRouter);
app.use("/api/admin", userRouter);
app.use("/api/admin/photos", photoRouter);
app.use("/api/admin/events", eventRouter);
app.use("/api/admin/testimonials", testimonialRouter);

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port} ✅`);
});
