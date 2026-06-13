const express = require('express');
const feedbackRouter = require('./routes/feedback');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/feedback', feedbackRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});