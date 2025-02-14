import contactEmail from "../Middleware/setupMailer.js";

const sendingEmail = (req, res) => {
  const { fullName, email, message, phone, subject } = req.body;

  const mail = {
    from: {
      name: process.env.SENDER_NAME,
      address: process.env.EMAIL_SERVICE_HOST,
    },
    to: [process.env.TARGET_EMAIL],
    replyTo: email,
    subject: "📩 ¡Nueva Solicitud de Cotización desde tu Página Web! 🎉",
    html: `
      <h3>📌 Detalles del Cliente:</h3>
      <ul>
      <li>👤 <b>Nombre:</b> ${fullName}</li>
       <li>📧 <b>Email:</b> ${email}</li>
        <li>📞 <b>Teléfono:</b> ${phone}</li>
        <li>📌 <b>Asunto:</b> ${subject}</li>
      </ul>
      <h4>📝 Mensaje:</h4>
      <p>${message}</p>
      <div style="margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px;">
        <p>🔔 No pierdas esta oportunidad! Responde cuanto antes para asegurar este cliente. 🚀</p>
        <p><i>📩 Este mensaje fue enviado automáticamente desde tu página web.</i></p>
      </div>
      `,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.status(500).json({
        error:
          "Ocurrió un problema. Por favor inténtalo de nuevo en unos minutos.",
      });
    } else {
      res.status(200).json({
        message:
          "Gracias por tu mensaje! En breve nos pondremos en contacto contigo!",
      });
    }
  });
};

export default sendingEmail;
