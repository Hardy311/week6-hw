const { Router } = require('express');
const router = Router();

// In-memory feedback data
let feedbacks = [
  {
    id: 1,
    author: "Ahmed",
    message: "Great workshop!",
    rating: 5
  },
  {
    id: 2,
    author: "Sara",
    message: "Very helpful content.",
    rating: 4
  }
];

let nextId = 3;

/*
====================================
GET ALL FEEDBACK
====================================
*/
router.get('/', (req, res) => {
  res.status(200).json(feedbacks);
});


/*
====================================
GET FEEDBACK BY ID
====================================
*/
router.get('/:id', (req, res) => {
  const feedback = feedbacks.find(f => f.id === parseInt(req.params.id));
  
  if (!feedback) {
    return res.status(404).json({ message: 'Feedback not found' });
  }
  
  res.status(200).json(feedback);
});


/*
====================================
POST NEW FEEDBACK
====================================
*/
router.post('/', (req, res) => {
  const { author, message, rating } = req.body;
  
  // Validation
  if (!author || !message || !rating) {
    return res.status(400).json({ 
      message: 'Author, message, and rating are required' 
    });
  }
  
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ 
      message: 'Rating must be between 1 and 5' 
    });
  }
  
  const newFeedback = {
    id: nextId++,
    author,
    message,
    rating
  };
  
  feedbacks.push(newFeedback);
  res.status(201).json(newFeedback);
});


/*
====================================
UPDATE FEEDBACK
====================================
*/
router.put('/:id', (req, res) => {
  const feedback = feedbacks.find(f => f.id === parseInt(req.params.id));
  
  if (!feedback) {
    return res.status(404).json({ message: 'Feedback not found' });
  }
  
  const { author, message, rating } = req.body;
  
  // Update fields if provided
  if (author) feedback.author = author;
  if (message) feedback.message = message;
  if (rating) {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        message: 'Rating must be between 1 and 5' 
      });
    }
    feedback.rating = rating;
  }
  
  res.status(200).json(feedback);
});


/*
====================================
DELETE FEEDBACK
====================================
*/
router.delete('/:id', (req, res) => {
  const index = feedbacks.findIndex(f => f.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Feedback not found' });
  }
  
  const deletedFeedback = feedbacks.splice(index, 1);
  res.status(200).json({ 
    message: 'Feedback deleted successfully',
    deleted: deletedFeedback[0]
  });
});

module.exports = router;


/*
====================================
DELETE FEEDBACK
====================================
*/
// TODO


module.exports = router;