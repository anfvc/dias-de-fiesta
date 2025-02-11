import express from "express";
import bodyParser from "body-parser";
import contactEmail from "../Middleware/mailer.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//* Contact from the route:

router.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, message, phone } = req.body;
  const name = `${firstName} ${lastName}`;

  const mail = {
    from: `${name} <${email}>`,
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
      res
        .status(500)
        .json({ error: "Email couldn't be sent. Try again later." });
    } else {
      res.status(200).json({ message: "Message sent successfully." });
    }
  });
});

export default router;
