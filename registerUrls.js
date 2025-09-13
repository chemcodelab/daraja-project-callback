require('dotenv').config();
const axios = require('axios');

// Replace with the token you just got
const accessToken = 'JerTySAaoLwgqoOHLo7XsUgl6jYL';

const payload = {
  ShortCode: '600005',
  ResponseType: 'Completed',
  ConfirmationURL: 'https://daraja-project-callback.onrender.com/payment-callback',
  ValidationURL: 'https://daraja-project-callback.onrender.com/payment-validation'
};

async function registerUrls() {
  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Callback URLs registered:', response.data);
  } catch (error) {
    console.error('❌ Registration failed:', error.response?.data || error.message);
  }
}

registerUrls();
