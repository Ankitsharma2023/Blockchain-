const express = require('express');
const bodyParser = require('body-parser');
const { createWallet, sendPayment } = require('./scripts/stellarService');

const app = express();
app.use(bodyParser.json());

app.post('/create-wallet', (req, res) => {
  const wallet = createWallet();
  res.json(wallet);
});

app.post('/send-payment', async (req, res) => {
  const { sourceSecret, destinationPublic, amount } = req.body;
  try {
    const result = await sendPayment(sourceSecret, destinationPublic, amount);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
