require('dotenv').config();
const axios = require('axios');

// Use the same token you generated earlier
const accessToken = 'JerTySAaoLwgqoOHLo7XsUgl6jYL';

const payload = {
  ShortCode: '600005',
  CommandID: 'CustomerPayBillOnline',
  Amount: '100',
  Msisdn: '254708374149',
  BillRefNumber: 'Test001'
};

async function simulatePayment() {
  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate',
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('💰 Payment simulated:', response.data);
  } catch (error) {
    console.error('❌ Simulation failed:', error.response?.data || error.message);
  }
}

simulatePayment();
