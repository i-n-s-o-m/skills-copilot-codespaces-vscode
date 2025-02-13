// Create web server for comments

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create express app
const app = express();

// Set up middleware
app.use(bodyParser.json());

// Set up routes
app.get('/comments', (req, res) => {
  // Read comments from file
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  // Read comments from file
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const comments = JSON.parse(data);

      // Add new comment
      comments.push(req.body);

      // Write comments to file
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(201).json({ message: 'Comment added successfully' });
        }
      });
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
