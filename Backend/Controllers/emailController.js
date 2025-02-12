import contactEmail from "../Middleware/setupMailer.js";

const sendingEmail = (req, res) => {
  const { fullName, email, message, phone, reason } = req.body;

  const mail = {
    from: {
      name: "Días de Fiesta Website",
      address: "diasdefiesta@gmail.com",
    },
    to: ["anfvcdev@gmail.com"],
    subject: "Contact Form Submission - Test",
    html: `
      <h2> ${fullName} </h2>
      <p> Reason: ${reason}</p>
      <p> Email: ${email} </p>
      <p> Phone: ${phone} </p>
      <p> Message: ${message} </p>
      <p> Reason: ${reason}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res
        .status(500)
        .json({ error: "Email couldn't be sent. Try again later." });
    } else {
      res.status(200).json({ message: "Message sent successfully." });
    }
  });
};

export default sendingEmail;
