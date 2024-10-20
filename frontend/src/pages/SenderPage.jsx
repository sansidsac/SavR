import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const waveAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(270deg, #004d00, #003300);
  background-size: 400% 400%;
  animation: ${waveAnimation} 15s ease infinite;
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;
  margin-bottom: 20px;

  &:hover {
    transform: scale(1.05);
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 2;
  }

  label {
    margin-right: 10px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  color: #000; /* Set text color to black */
  flex: 1;

  &:focus {
    background-color: #004d00;
    color: #fff;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #006600;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004d00;
  }
`;

const FoodItemList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
`;

const FoodItem = styled.li`
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const SenderPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    quantity: '',
    location: '',
    price: '',
    timeOfPreparation: '',
    maxTimeBeforeBestUse: '',
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
    <PageContainer>
      <h2>Sender: Add / Remove Food Items</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Quantity / Serves</label>
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time of Preparation</label>
          <Input
            type="datetime-local"
            name="timeOfPreparation"
            value={formData.timeOfPreparation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Max Time Before Best Use</label>
          <Input
            type="datetime-local"
            name="maxTimeBeforeBestUse"
            value={formData.maxTimeBeforeBestUse}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="button" onClick={addFoodItem}>Add Food Item</Button>
      </Form>
      <h3>Food Items List</h3>
      <FoodItemList>
        {foodItems.map((item, index) => (
          <FoodItem key={index}>
            <span>
              Quantity: {item.quantity}, Location: {item.location}, Price: {item.price}, 
              Time of Preparation: {item.timeOfPreparation}, Max Time Before Best Use: {item.maxTimeBeforeBestUse}
            </span>
            <Button type="button" onClick={() => removeFoodItem(index)}>Remove</Button>
          </FoodItem>
        ))}
      </FoodItemList>
      {foodItems.length > 0 && (
        <Button onClick={handleSubmit}>Submit Task</Button>
      )}
    </PageContainer>
  );
};

export default SenderPage;
