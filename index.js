const express = require('express');
const connection = require('./conf');

const app = express();
const port = 3000;

app.get('/api/employees', (req, res) => {
  let query = 'SELECT * FROM employee';
  const sqlValues = [];

  if (req.query.department) {
    query += ' WHERE department = ?';
    sqlValues.push(req.query.department);
  }
  connection.query(query, sqlValues, (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: `An error occurred: ${err.message}` });
    }
    res.json(results);
  });
});

app.get('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM employee WHERE ID = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: `An error occurred: ${err.message}` });
    }
    if (results.length === 0) {
      res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.json(results);
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
