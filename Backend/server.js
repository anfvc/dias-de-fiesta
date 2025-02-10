import express from "express";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 5100;

app.get("/api", (req, res) => {
  res.json({ message: "Testing the server!!" });
});

app.listen(port, () => {
  console.log(`Server is listening to port: ${port} ✅`);
});
