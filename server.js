const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`📥 Incoming request: ${req.method} ${req.url}`);
  next();
});

app.post('/payment-callback', (req, res) => {
  console.log('✅ Confirmation received:', req.body);
  res.status(200).json({ ResultCode: 0, ResultDesc: 'Confirmation Received Successfully' });
});

app.post('/payment-validation', (req, res) => {
  console.log('🔍 Validation request:', req.body);
  res.status(200).json({ ResultCode: 0, ResultDesc: 'Validation Passed Successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
