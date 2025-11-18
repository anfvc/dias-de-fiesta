import nodemailer from "nodemailer";

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVICE_HOST,
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
