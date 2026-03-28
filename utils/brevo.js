const BrevoClient = require("@getbrevo/brevo");

const brevoClient = new BrevoClient.TransactionalEmailsApi()
brevoClient.setApiKey(BrevoClient.TransactionalEmailsApiApiKeys.apiKey, process.env.brevo_api_key);

const brevo = async (consumerEmail, consumerName, html) => {
    const sendSmtpEmail = new BrevoClient.SendSmtpEmail()
    const data = {
        htmlContent: `<html><head></head><body><p>Hello ${consumerName} ,</p>Welcome to backend!.</p></body></html>`,
        sender: {
            email: "christyrinwa@gmail.com",
            name: "chris from Splita",
        },
        subject: "Hello from Splita!",
    };
    sendSmtpEmail.to = [{
        email: consumerEmail
    }] 
    sendSmtpEmail.subject = data.subject
    sendSmtpEmail.htmlContent = html
    sendSmtpEmail.sender = data.sender
   
    await brevoClient.sendTransacEmail(sendSmtpEmail);
}

module.exports = {brevo}