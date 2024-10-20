const express = require('express');
const cors= require('cors');
const { exec } = require('child_process');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

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