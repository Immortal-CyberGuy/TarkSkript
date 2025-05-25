const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { processSanskritCode } = require('./executor');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/run', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code sent' });

  console.log('Code received:\n', code);

  const result = processSanskritCode(code);

  if (result.error) {
    console.error('Error during execution:', result.error);
  } else {
    console.log('Execution output:', result.programOutput);
  }

  res.json(result);
});

app.listen(4000, () => console.log('Server running on port 4000'));
