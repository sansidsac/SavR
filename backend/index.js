const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load the dataset
let data = [];

fs.createReadStream('alldata.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// Endpoint to get filtered data
app.post('/filter', (req, res) => {
  const { day, food, region } = req.body;
  const filteredData = data.filter(item => 
    day.includes(item.Day) && 
    food.includes(item.Food) && 
    region.includes(item.Region)
  );
  res.json(filteredData);
});

// Endpoint to predict food wastage amount
app.post('/predict', (req, res) => {
  const {
    type_of_food,
    number_of_guests,
    event_type,
    quantity_of_food,
    storage_conditions,
    purchase_history,
    seasonality,
    preparation_method,
    geographical_location,
    pricing
  } = req.body;

  const command = `python predict.py "${type_of_food}" ${number_of_guests} "${event_type}" ${quantity_of_food} "${storage_conditions}" "${purchase_history}" "${seasonality}" "${preparation_method}" "${geographical_location}" "${pricing}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error predicting food wastage amount');
    }
    res.send({ prediction: parseFloat(stdout) });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});