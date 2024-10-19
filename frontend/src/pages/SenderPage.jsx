import { useState } from 'react';

function taskService(data) {
    console.log(data);
}

const SenderPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    quantity: '',
    location: '',
    price: '',
    timeOfPreparation: '',
    maxTimeBeforeBestUse: '',
  });

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add food item to list
  const addFoodItem = () => {
    setFoodItems([
      ...foodItems,
      { ...formData }
    ]);
    setFormData({
      quantity: '',
      location: '',
      price: '',
      timeOfPreparation: '',
      maxTimeBeforeBestUse: '',
    });
  };

  // Remove food item from the list
  const removeFoodItem = (index) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  // Submit task to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      taskService(foodItems); // Replace with actual API call
      alert('Task submitted successfully!');
      setFoodItems([]);
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Failed to submit task.');
    }
  };

  return (
    <div className="sender-page">
      <h2>Sender: Add / Remove Food Items</h2>
      
      {/* Form for adding food items */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quantity / Serves</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Time of Preparation</label>
          <input
            type="datetime-local"
            name="timeOfPreparation"
            value={formData.timeOfPreparation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Max Time Before Best Use</label>
          <input
            type="datetime-local"
            name="maxTimeBeforeBestUse"
            value={formData.maxTimeBeforeBestUse}
            onChange={handleChange}
            required
          />
        </div>

        <button type="button" onClick={addFoodItem}>Add Food Item</button>
      </form>

      {/* Display added food items */}
      <h3>Food Items List</h3>
      <ul>
        {foodItems.map((item, index) => (
          <li key={index}>
            Quantity: {item.quantity}, Location: {item.location}, Price: {item.price}, 
            Time of Preparation: {item.timeOfPreparation}, Max Time Before Best Use: {item.maxTimeBeforeBestUse}
            <button type="button" onClick={() => removeFoodItem(index)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Submit button */}
      {foodItems.length > 0 && (
        <button onClick={handleSubmit}>Submit Task</button>
      )}
    </div>
  );
};

export default SenderPage;
