import express from "express";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import apiRoute from "./Routes/apiRouter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRoute);

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send.");
  }
});

app.post(
  "/api/contact",
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    const name = req.body.firstName + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
      from: name,
      to: process.env.EMAIL_ADDRESS,
      subject: "Contact Form Submission - Test",
      html: `<p> Name: ${name} </p>
      <p> Email: ${email} </p>
      <p> Phone: ${phone} </p>
      <p> Message: ${message} </p>`,
    };

    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json(error);
      } else {
        res.status(200).json({ message: "Message sent successfully." });
      }
    });
  }
);

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port} ✅`);
});
