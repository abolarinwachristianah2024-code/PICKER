// const BrevoClient = require("@getbrevo/brevo");

// const brevoClient = new BrevoClient.TransactionalEmailsApi()
// brevoClient.setApiKey(BrevoClient.TransactionalEmailsApiApiKeys.apiKey, process.env.brevo_api_key);

// exports.brevo = async (userEmail, userName, html) => {
//     const sendSmtpEmail = new BrevoClient.SendSmtpEmail()
//     const data = {
//         htmlContent: html,
//         sender: {
//             email: "christyrinwa@gmail.com",
//             name: "chris from Splita",
//         },
//         subject: "Hello from Splita!",
//     };
//     sendSmtpEmail.to = [{
//         email: userEmail,
//         name: userName
//     }]
//     sendSmtpEmail.subject = data.subject
//     sendSmtpEmail.htmlContent = html
//     sendSmtpEmail.sender = data.sender

//     await brevoClient.sendTransacEmail(sendSmtpEmail);
// }


const Brevo = require('@getbrevo/brevo')

exports.sendEmail = async (options) => {
    try {
        const apikey = process.env.BREVO_API_KEY;
        const apiInstance = new Brevo.TransactionalEmailsApi();
        apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apikey);
        const sendSmtpEmail = new Brevo.SendSmtpEmail();
        sendSmtpEmail.subject = options.subject;
        sendSmtpEmail.to = [{ email: options.email }];
        sendSmtpEmail.sender = { name: "Christianah from PICKER", email: "christyrinwa@gmail.com" };
        sendSmtpEmail.htmlContent = options.html;
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent to:", options.email);
    } catch (error) {
        throw new Error("Email not sent to:", options.email)
    }
}
