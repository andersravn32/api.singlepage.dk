const status = require("./status.json");
const fs = require("fs");

// General purpose JSON composer for streamlining HTTP communication from REST servers.
const compose = (status = null, data = null, message = null) => {
  return {
    time: Math.round(Date.now() / 1000),
    status: status,
    data: data,
    message: message,
  };
};

// Compose email based on the html template included in this package
const composeEmail = (subject = null, to = null, body = null) => {
  const emailTemplate = ``;

  return {
    from: '"TRIBE Media" <kursus@tribemedia.dk>',
    to: to,
    subject: subject,
    html: emailTemplate,
  };
};

module.exports = {
  status,
  compose,
  composeEmail,
};