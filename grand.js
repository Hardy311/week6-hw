const express = require('express');
const app = express();
const PORT = 3000;

const artifactsRouter = require('./routes/artifacts');

app.use(express.json());
app.use('/artifacts', artifactsRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Grand Egyptian Museum API'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});