// SalesInventoryRoute.js
const express = require('express');
const router = express.Router();
const db = require('./Database.js');

// Get a list of all sales transactions
router.get('/sales', (req, res) => {
  db.query('SELECT * FROM Sales', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Get details of a specific sale by ID
router.get('/sales/:TransactionID', (req, res) => {
  const transactionID = req.params.TransactionID;
  db.query('SELECT * FROM Sales WHERE TransactionID = ?', [transactionID], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Sale not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new sales transaction record (POST request)

// Update the details of a specific sale (PUT request)

// Delete a sales transaction from the system (DELETE request)

// Retrieve the inventory status of all vehicles at all dealerships (GET request)

// Retrieve the inventory status of vehicles at a specific dealership (GET request)

// Update the stock count for a specific vehicle at a specific dealership (POST request)

// Update the stock count of a specific vehicle in the inventory (PUT request)

// Delete a vehicle from the inventory of a specific dealership (DELETE request)

module.exports = router;
