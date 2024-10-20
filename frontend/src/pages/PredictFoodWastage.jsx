import React, { useState } from 'react';
import axios from 'axios';

const PredictFoodWastage = () => {
    const [formData, setFormData] = useState({
        type_of_food: '',
        number_of_guests: 100,
        event_type: '',
        quantity_of_food: 100,
        storage_conditions: '',
        purchase_history: '',
        seasonality: '',
        preparation_method: '',
        geographical_location: '',
        pricing: ''
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/predict', formData);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error predicting food wastage amount', error);
        }
    };

    return (
        <div>
            <style>
                {`
                    @keyframes gradientBackground {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animated-background {
                        background: linear-gradient(270deg, #38b2ac, #48bb78, #2d3748);
                        background-size: 600% 600%;
                        animation: gradientBackground 10s ease infinite;
                    }
                `}
            </style>
            <div className="min-h-screen flex items-center justify-center animated-background">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Predict Food Wastage Amount</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Type of Food:</label>
                            <select name="type_of_food" value={formData.type_of_food} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3">
                                <option value="">Select Type of Food</option>
                                <option value="Meat">Meat</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Baked Goods">Baked Goods</option>
                                <option value="Dairy Products">Dairy Products</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Number of Guests:</label>
                            <input type="number" name="number_of_guests" value={formData.number_of_guests} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Event Type:</label>
                            <select name="event_type" value={formData.event_type} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3">
                                <option value="">Select Event Type</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Social Gathering">Social Gathering</option>
                                
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Quantity of Food:</label>
                            <input type="number" name="quantity_of_food" value={formData.quantity_of_food} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Storage Conditions:</label>
                            <select name="storage_conditions" value={formData.storage_conditions} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3">
                                <option value="">Select Storage Conditions</option>
                                <option value="Refrigerated">Refrigerated</option>
                                <option value="Room Temperature">Room Temperature</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Purchase History:</label>
                            <select name="purchase_history" value={formData.purchase_history} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3">
                                <option value="">Select Purchase History</option>
                                <option value="Regular">Regular</option>
                                <option value="Occasional">Occasional</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Seasonality:</label>
                            <select name="seasonality" value={formData.seasonality} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3">
                                <option value="">Select Seasonality</option>
                                <option value="All Seasons">All Seasons</option>
                                <option value="Winter">Winter</option>
                                <option value="Summer">Summer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Preparation Method:</label>
                            <select name="preparation_method" value={formData.preparation_method} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3">
                                <option value="">Select Preparation Method</option>
                                <option value="Buffet">Buffet</option>
                                <option value="Finger Food">Finger Food</option>
                                <option value="Sit-down Dinner">Sit-down Dinner</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Geographical Location:</label>
                            <select name="geographical_location" value={formData.geographical_location} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3">
                                <option value="">Select Geographical Location</option>
                                <option value="Urban">Urban</option>
                                <option value="Rural">Rural</option>
                                <option value="Suburban">Suburban</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Pricing:</label>
                            <select name="pricing" value={formData.pricing} onChange={handleChange} className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3">
                                <option value="">Select Pricing</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">Predict</button>
                    </form>
                    {prediction !== null && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold text-center">Predicted Wastage Food Amount: {prediction}</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PredictFoodWastage;