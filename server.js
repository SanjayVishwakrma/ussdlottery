const express = require('express');
const bodyParser = require('body-parser');
const { processUSSDRequest } = require('./lotteryEngine');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;
  const response = processUSSDRequest(sessionId, phoneNumber, text);
  res.set('Content-Type', 'text/plain');
  res.send(response);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ USSD demo server running on http://localhost:${PORT}/ussd`));