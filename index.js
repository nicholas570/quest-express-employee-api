const express = require('express');
const connection = require('./conf');

const app = express();
const port = 3000;

// respond to requests on `/api/employees`
app.get('/api/employees', (req, res) => {
  // send an SQL query to get all employees
  connection.query('SELECT * from employee', (err, results) => {
    if (err) {
      // If an error has occurred, then the client is informed of the error
      res.status(500).send('Erreur lors de la récupération des employés');
    } else {
      // If everything went well, we send the result of the SQL query as JSON
      res.json(results);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
