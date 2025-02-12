import contactEmail from "../Middleware/mailer.js";

const sendingEmail = (req, res) => {
  const { email, message, phone } = req.body;

  const mail = {
    from: {
      name: "Días de Fiesta Website",
      address: "diasdefiesta@gmail.com",
    },
    to: ["anfvcdev@gmail.com"],
    subject: "Contact Form Submission - Test",
    //`<p> Name: ${name} </p>
    html: `<p> Email: ${email} </p>
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
};

export default sendingEmail;
