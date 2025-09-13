require('dotenv').config();
const axios = require('axios');
const base64 = require('base-64');

// Load credentials from .env
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

// Validate presence of credentials
if (!consumerKey || !consumerSecret) {
  console.error('❌ Missing CONSUMER_KEY or CONSUMER_SECRET in .env');
  process.exit(1);
}

// Encode credentials
const auth = base64.encode(`${consumerKey}:${consumerSecret}`);

// Request access token
async function getAccessToken() {
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const token = response.data.access_token;
    console.log('🔑 Access Token:', token);
    return token;
  } catch (error) {
    console.error('❌ Failed to get access token:', error.response?.data || error.message);
  }
}

getAccessToken();
