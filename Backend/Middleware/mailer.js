import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//* Verifying connection to the email server:
contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send.");
  }
});

export default contactEmail;
