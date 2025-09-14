require('dotenv').config();
const axios = require('axios');
const getAccessToken = require('./getToken');

const payload = {
  ShortCode: '600005',
  CommandID: 'CustomerPayBillOnline',
  Amount: '100',
  Msisdn: '254708374149',
  BillRefNumber: 'Test001'
};

async function simulatePayment() {
  const token = await getAccessToken();
  const res = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate',
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  console.log('💰 Payment simulated:', res.data);
}

simulatePayment();
