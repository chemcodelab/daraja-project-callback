require('dotenv').config();
const africastalking = require('africastalking')({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const sms = africastalking.SMS;

function sendSMS(to, message) {
  return sms.send({ to: [to], message });
}

module.exports = sendSMS;
