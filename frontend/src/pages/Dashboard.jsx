import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState([]);
  const [foods, setFoods] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    // Fetch initial data
    axios.post('http://localhost:3000/filter', {
      day: [],
      food: [],
      region: []
    }).then(response => {
      setData(response.data);
      setDays([...new Set(response.data.map(item => item.Day))]);
      setFoods([...new Set(response.data.map(item => item.Food))]);
      setRegions([...new Set(response.data.map(item => item.Region))]);
    });
  }, []);

  const handleFilter = () => {
    axios.post('http://localhost:3000/filter', {
      day: selectedDays,
      food: selectedFoods,
      region: selectedRegions
    }).then(response => {
      setData(response.data);
    });
  };

  const handlePredict = () => {
    axios.post('http://localhost:3000/predict', {
      type_of_food: selectedFoods[0],
      number_of_guests: 100, // Example value, you can change it as needed
      event_type: 'Wedding', // Example value, you can change it as needed
      quantity_of_food: 50, // Example value, you can change it as needed
      storage_conditions: 'Refrigerated', // Example value, you can change it as needed
      purchase_history: 'Regular', // Example value, you can change it as needed
      seasonality: 'All Seasons', // Example value, you can change it as needed
      preparation_method: 'Buffet', // Example value, you can change it as needed
      geographical_location: selectedRegions[0],
      pricing: 'Moderate' // Example value, you can change it as needed
    }).then(response => {
      setPrediction(response.data.prediction);
    });
  };

  const totalCO2Reduced = data.reduce((acc, item) => acc + parseFloat(item['Total Carbon Reductions']), 0);
  const avgCO2Reduced = totalCO2Reduced / 7;

  const groupByDays = data.reduce((acc, item) => {
    acc[item.Day] = (acc[item.Day] || 0) + parseFloat(item['Total Carbon Reductions']);
    return acc;
  }, {});

  const groupByRegions = data.reduce((acc, item) => {
    acc[item.Region] = (acc[item.Region] || 0) + parseFloat(item['Total Carbon Reductions']);
    return acc;
  }, {});

  return (
    <div>
      <h1>CO2 Reduction Dashboard</h1>
      <div>
        <label>Select Days:</label>
        <select multiple value={selectedDays} onChange={e => setSelectedDays([...e.target.selectedOptions].map(option => option.value))}>
          {days.map(day => <option key={day} value={day}>{day}</option>)}
        </select>
      </div>
      <div>
        <label>Select Foods:</label>
        <select multiple value={selectedFoods} onChange={e => setSelectedFoods([...e.target.selectedOptions].map(option => option.value))}>
          {foods.map(food => <option key={food} value={food}>{food}</option>)}
        </select>
      </div>
      <div>
        <label>Select Regions:</label>
        <select multiple value={selectedRegions} onChange={e => setSelectedRegions([...e.target.selectedOptions].map(option => option.value))}>
          {regions.map(region => <option key={region} value={region}>{region}</option>)}
        </select>
      </div>
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handlePredict}>Predict</button>
      {prediction !== null && (
        <div>
          <h2>Predicted Wastage Food Amount: {prediction} kg</h2>
        </div>
      )}
      <div>
        <h2>Total Weekly Carbonfootprint Reduction: {totalCO2Reduced} kg CO₂e/kg</h2>
        <h2>Average Daily Carbonfootprint Reduction: {avgCO2Reduced} kg CO₂e/kg</h2>
      </div>
      <Plot
        data={[
          {
            x: Object.keys(groupByDays),
            y: Object.values(groupByDays),
            type: 'bar',
            marker: { color: '#0083B8' },
          },
        ]}
        layout={{ title: 'Carbon Reductions Per Day', template: 'plotly_white' }}
      />
      <Plot
        data={[
          {
            x: Object.keys(groupByRegions),
            y: Object.values(groupByRegions),
            type: 'bar',
            marker: { color: '#0083B8' },
          },
        ]}
        layout={{ title: 'Carbon Reductions Per Region', template: 'plotly_white' }}
      />
    </div>
  );
};

export default Dashboard;