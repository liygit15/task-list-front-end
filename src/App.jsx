import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
  {
    id: 3,
    title: 'learn java',
    isComplete: false,
  },
];

const countCompletedTasks = taskData => {
  let countCT = 0;
  for (const task of taskData){
    if (task.isComplete) {
      countCT += 1;
    }
  };
  return countCT;
};

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const handleToggleComplete = id => {
    setTaskData(taskData => {
      return taskData.map(task => {
        if (task.id === id) {
          return {...task, isComplete: !task.isComplete};
        } else {
          return task;
        }
      });
    });
  };

  const handleDeleteTask = id => {
    // console.log(id);
    setTaskData(taskData => {
      return taskData.filter(task => task.id !== id);
    });
  };

  const completedTasks = countCompletedTasks(taskData);
  const totalTasks = (taskData).length;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <p>{completedTasks}/{totalTasks} tasks completed</p>
        <div>{<TaskList
          tasks={taskData}
          handleToggleComplete={handleToggleComplete}
          handleDeleteTask={handleDeleteTask}/>}</div>
      </main>
    </div>
  );
};

export default App;
