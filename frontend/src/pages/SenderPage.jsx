import { useState } from 'react';

const SenderPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    quantity: '',
    location: '',
    price: '',
    timeOfPreparation: '',
    maxTimeBeforeBestUse: '',
    item: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addFoodItem = () => {
    setFoodItems([
      ...foodItems,
      { ...formData, items: [] }
    ]);
    setFormData({
      quantity: '',
      location: '',
      price: '',
      timeOfPreparation: '',
      maxTimeBeforeBestUse: '',
      item: '',
    });
  };

  const removeFoodItem = (index) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  const taskService = async (foodItems) => {
    // Implement task submission logic here
    console.log('Task Submitted :', foodItems);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      taskService(foodItems);
      alert('Task submitted successfully!');
      setFoodItems([]);
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Failed to submit task.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 text-white">
      <h2 className="text-3xl font-bold mb-6">Sender: Add / Remove Food Items</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xl bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-lg">Item Name</label>
          <input
            type="text"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 text-white focus:bg-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Quantity / Serves</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 text-white focus:bg-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 text-white focus:bg-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 text-white focus:bg-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Time of Preparation</label>
          <input
            type="datetime-local"
            name="timeOfPreparation"
            value={formData.timeOfPreparation}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 text-white focus:bg-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Max Time Before Best Use</label>
          <input
            type="datetime-local"
            name="maxTimeBeforeBestUse"
            value={formData.maxTimeBeforeBestUse}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 text-white focus:bg-gray-600"
          />
        </div>
        <button type="button" onClick={addFoodItem} className="p-3 rounded bg-blue-700 text-white hover:bg-blue-800">Add Food Item</button>
      </form>
      <h3 className="text-2xl font-semibold mb-4">Food Items List</h3>
      <ul className="list-none p-0 w-full max-w-xl mt-6">
        {foodItems.map((item, index) => (
          <li key={index} className="bg-gray-900 bg-opacity-80 p-4 rounded-lg mb-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span>
                <strong>Item:</strong> {item.item}, <strong>Quantity:</strong> {item.quantity}, <strong>Location:</strong> {item.location}, <strong>Price:</strong> {item.price}, 
                <strong>Time of Preparation:</strong> {item.timeOfPreparation}, <strong>Max Time Before Best Use:</strong> {item.maxTimeBeforeBestUse}
              </span>
              <button type="button" onClick={() => removeFoodItem(index)} className="p-2 rounded bg-red-600 text-white hover:bg-red-700">Remove</button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {item.items.map((subItem, subIndex) => (
                <li key={subIndex} className="text-white">{subItem}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {foodItems.length > 0 && (
        <button onClick={handleSubmit} className="p-3 rounded bg-blue-700 text-white hover:bg-blue-800 mt-6">Submit Task</button>
      )}
    </div>
  );
};

export default SenderPage;
