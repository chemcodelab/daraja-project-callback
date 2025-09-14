require('dotenv').config();
const africastalking = require('africastalking')({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const sms = africastalking.SMS;

/**
 * Sends an SMS message to a given phone number.
 * @param {string} to - Recipient phone number in international format (e.g. 2547XXXXXXXX).
 * @param {string} message - Message content.
 * @returns {Promise<void>}
 */
async function sendSMS(to, message) {
  console.log(`📤 Attempting to send SMS to ${to}: "${message}"`);

  try {
    const response = await sms.send({ to: [to], message });

    if (response.SMSMessageData && response.SMSMessageData.Recipients.length > 0) {
      const recipient = response.SMSMessageData.Recipients[0];
      console.log(`✅ SMS sent successfully. Cost: ${recipient.cost}, Status: ${recipient.status}`);
    } else {
      console.warn('⚠️ SMS sent but no recipients returned. Response:', response);
    }
  } catch (error) {
    console.error('❌ SMS failed to send:', error.message || error);
    throw error;
  }
}

module.exports = sendSMS;
