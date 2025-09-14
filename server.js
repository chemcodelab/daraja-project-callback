require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sendSMS = require('./sendSMS');

const app = express();
app.use(bodyParser.json());

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Daraja Callback Server is running');
});

// Payment confirmation callback
app.post('/payment-callback', async (req, res) => {
  const { TransactionType, TransID, TransAmount, MSISDN, BillRefNumber } = req.body;

  console.log('✅ Callback received:');
  console.log(JSON.stringify(req.body, null, 2));

  console.log(`📦 Delivering ${TransAmount}MB to ${MSISDN}...`);

  const message = `Your ${TransAmount}MB bundle has been delivered. Thank you!`;

  try {
    await sendSMS(MSISDN, message);
    console.log(`📲 SMS sent to ${MSISDN}`);
  } catch (err) {
    console.error('❌ SMS failed:', err.message);
  }

  res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

// Optional: validation route
app.post('/payment-validation', (req, res) => {
  console.log('🧾 Validation received:');
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).json({ ResultCode: 0, ResultDesc: 'Validated' });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
