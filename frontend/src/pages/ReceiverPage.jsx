import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import Card from '../components/Card';

import React from 'react'

const ReceiverPage = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const reloadTasks = async () => {
      try {
        // Force a re-import of the module
        const module = await import(`./tasks.json`);
        setTaskData(module.default.items);
        console.log('Tasks reloaded:', module.default,items);
      } catch (error) {
        console.error('Error reloading tasks:', error);
      }
    };

    // Set up polling every 2 seconds
    const intervalId = setInterval(reloadTasks, 200);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <><Navbar />
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Items:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {taskData.slice(0, 12).map((item, index) => (
          <Card
            key={index}
            itemName={item.itemName}
            description={`Description for ${item.itemName}`}
            quantity={item.quantity}
            price={item.price}
            location={item.location}
            preparedTime={item.preparedTime}
            expiryTime={item.expiryTime}
            className="p-4 border rounded shadow-lg"
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default ReceiverPage;