require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const paymentRoutes = require('./routes/payment');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());

app.use('/api/payment', paymentRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'styleboss-payment' }));

app.listen(PORT, () => {
  console.log(`StyleBoss payment server running on port ${PORT}`);
});
