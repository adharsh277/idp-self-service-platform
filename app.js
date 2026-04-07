const express = require('express');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', serviceRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});