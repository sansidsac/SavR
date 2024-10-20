import { useEffect, useState } from 'react';
import tasks from './tasks.json';

import React from 'react'

const ReceiverPage = () => {
  const [taskData, setTaskData] = useState(tasks);

  useEffect(() => {
    const reloadTasks = async () => {
      try {
        // Force a re-import of the module
        const module = await import(`./tasks.json`);
        setTaskData(module.default);
        // console.log('Tasks reloaded:', module.default);
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
    <div>
      <h1>Tasks</h1>
      <pre>{JSON.stringify(taskData, null, 2)}</pre>
      <div>Number of tasks: {Object.keys(taskData.tasks).length}</div>
    </div>
  );
};

export default ReceiverPage;