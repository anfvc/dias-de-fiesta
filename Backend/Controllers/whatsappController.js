const handleSendWhatsApp = async (req, res) => {
  console.log("HandleSendWhatsApp function called----:");
  const whatsappNumber = process.env.WHATSAPP_NUMBER;

  const message = "Hola, me interesa más información sobre sus servicios.";

  const encodedMessage = encodeURIComponent(message);

  const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

  console.log(`URL: ${url}`);
  // Redirect to the WhatsApp URL

  res.redirect(url);
};

export default handleSendWhatsApp;
