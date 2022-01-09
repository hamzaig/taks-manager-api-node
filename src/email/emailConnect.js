const sendGridMail = require("@sendgrid/mail");

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMessage = (name, email) => {
  sendGridMail.send({
    to: email,
    from: "aahilseemab733622@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  })
}

const sendCancelEmail = (name, email) => {
  sendGridMail.send({
    to: email,
    from: "aahilseemab733622@gmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
}

module.exports = {
  sendWelcomeMessage,
  sendCancelEmail,
}