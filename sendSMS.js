const africastalking = require('africastalking')({
  apiKey: 'atsk_9041eab0c827dd06bb2e1fbfb54fe433621ae8c146123967e149cf501b698e0bab4afb4a',
  username: 'sandbox'
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
