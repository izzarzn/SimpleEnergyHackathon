// DealerManagementRoute.js
const express = require('express');
const router = express.Router();
const db = require('./Database.js');

// Get a list of all dealers
router.get('/dealers', (req, res) => {
  db.query('SELECT * FROM Dealer', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Get details of a specific dealer by ID
router.get('/dealers/:DealerID', (req, res) => {
  const dealerID = req.params.DealerID;
  db.query('SELECT * FROM Dealer WHERE DealerID = ?', [dealerID], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Dealer not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new dealer record (POST request)

// Update the details of a specific dealer (PUT request)

// Delete a dealer from the system (DELETE request)

module.exports = router;
