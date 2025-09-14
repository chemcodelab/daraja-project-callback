require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('✅ Daraja Callback Server is running');
});

app.post('/payment-callback', (req, res) => {
  console.log('✅ Callback received:', JSON.stringify(req.body, null, 2));
  const { MSISDN, TransAmount } = req.body;
  console.log(`📦 Delivering ${TransAmount}MB to ${MSISDN}...`);
  res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
