const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`📥 Incoming request: ${req.method} ${req.url}`);
  next();
});

// Simulated bundle delivery function
function deliverBundle(msisdn, amount) {
  console.log(`📦 Delivering ${amount}MB to ${msisdn}...`);
  setTimeout(() => {
    console.log(`✅ Bundle delivered to ${msisdn} for ${amount}MB`);
  }, 1000);
}

// Payment confirmation route
app.post('/payment-callback', (req, res) => {
  console.log('✅ Confirmation received:', req.body);

  const { TransAmount, MSISDN, TransID } = req.body;

  // Trigger mock bundle delivery
  deliverBundle(MSISDN, TransAmount);

  res.status(200).json({
    ResultCode: 0,
    ResultDesc: 'Confirmation Received Successfully'
  });
});

// Payment validation route
app.post('/payment-validation', (req, res) => {
  console.log('🔍 Validation request:', req.body);
  res.status(200).json({
    ResultCode: 0,
    ResultDesc: 'Validation Passed Successfully'
  });
});

// Dynamic port binding for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
