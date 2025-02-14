import contactEmail from "../Middleware/setupMailer.js";

const sendingEmail = (req, res) => {
  const { fullName, email, message, phone, subject } = req.body;

  const mail = {
    from: {
      name: "Días de Fiesta Website",
      address: process.env.EMAIL_SERVICE_HOST,
    },
    to: [process.env.TARGET_EMAIL],
    replyTo: email,
    subject: "¡Tienes un nuevo mensaje de tu Página Web!",
    html: `
      <h2> ${fullName} </h2>
      <p> Email: ${email} </p>
      <p> Phone: ${phone} </p>
      <p> Subject: ${subject}</p>
      <p> Message: ${message} </p>
      `,
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
