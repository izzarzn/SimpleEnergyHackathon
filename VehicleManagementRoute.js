// VehicleManagementRoute.js
const express = require('express');
const router = express.Router();
const db = require('./Database.js');

// Get a list of all vehicles
router.get('/vehicles', (req, res) => {
  db.query('SELECT * FROM Vehicle', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Get details of a specific vehicle by ID
router.get('/vehicles/:VehicleID', (req, res) => {
  const vehicleID = req.params.VehicleID;
  db.query('SELECT * FROM Vehicle WHERE VehicleID = ?', [vehicleID], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Vehicle not found' });
    } else {
      res.json(results[0]);
    }
  });
});

router.post('/vehicles', (req, res) => {
    const { make, model, year } = req.body; // Assuming you have these properties in the request body
  
    // Validate input data (e.g., check for required fields)
    if (!make || !model || !year) {
      return res.status(400).json({ error: 'Make, model, and year are required fields' });
    }
  
    // Insert the new vehicle record into the database
    db.query('INSERT INTO Vehicle (make, model, year) VALUES (?, ?, ?)', [make, model, year], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // Optionally, you can return the newly created vehicle ID or a success message
      res.status(201).json({ message: 'Vehicle created successfully', vehicleId: results.insertId });
    });
  });
  

  router.put('/vehicles/:VehicleID', (req, res) => {
    const vehicleID = req.params.VehicleID;
    const { make, model, year } = req.body; // Assuming you have these properties in the request body
  
    // Validate input data (e.g., check for required fields)
    if (!make || !model || !year) {
      return res.status(400).json({ error: 'Make, model, and year are required fields' });
    }
  
    // Update the specific vehicle record in the database
    db.query('UPDATE Vehicle SET make = ?, model = ?, year = ? WHERE VehicleID = ?', [make, model, year, vehicleID], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      // Optionally, you can return a success message
      res.json({ message: 'Vehicle updated successfully' });
    });
  });
  

  router.delete('/vehicles/:VehicleID', (req, res) => {
    const vehicleID = req.params.VehicleID;
  
    // Delete the specific vehicle record from the database
    db.query('DELETE FROM Vehicle WHERE VehicleID = ?', [vehicleID], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      // Optionally, you can return a success message
      res.json({ message: 'Vehicle deleted successfully' });
    });
  });
  

module.exports = router;
