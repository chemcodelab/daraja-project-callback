require('dotenv').config();
const axios = require('axios');
const base64 = require('base-64');

const auth = base64.encode(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`);

async function getAccessToken() {
  const res = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res.data.access_token;
}

module.exports = getAccessToken;
