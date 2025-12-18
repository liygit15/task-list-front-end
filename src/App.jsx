import TaskList from './components/TaskList.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
//   {
//     id: 3,
//     title: 'learn java',
//     isComplete: false,
//   },
// ];

const countCompletedTasks = taskData => {
  let countCT = 0;
  for (const task of taskData){
    if (task.isComplete) {
      countCT += 1;
    }
  };
  return countCT;
};

const kbaseURL = 'http://localhost:5000';

const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete ? apiTask.is_complete : false,
    goalId: apiTask.goal_id ? apiTask.goal_id : null,
  };

  delete newTask.is_complete;
  delete newTask.goalId;

  return newTask;
};

const toggleCompleTaskAPI = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_complete`)
    .catch(error => console.log(error));
};

const toggleInCompleTaskAPI = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_incomplete`)
    .catch(error => console.log(error));
};

const deleteTaskAPI = id => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
    .catch(error => console.log(error));
};

const addTaskAPI = (newTask) => {
  return axios.post(`${kbaseURL}/tasks`, newTask)
    .catch(error => console.log(error));
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const handleToggleComplete = id => {
    return toggleCompleTaskAPI(id)
      .then(() => {
        return setTaskData(taskData =>{
          return taskData.map(task => task.id === id ? {...task, isComplete: !task.isComplete} : task);
        });
      });
  };

  const handleToggleInComplete = id => {
    return toggleInCompleTaskAPI(id)
      .then(() => {
        return setTaskData(taskData =>{
          return taskData.map(task => task.id === id ? {...task, isComplete: !task.isComplete} : task);
        });
      });
  };

  const handleDeleteTask = id => {
    return deleteTaskAPI(id)
      .then(() => {
        return setTaskData(taskData => {
          return taskData.filter(task => task.id !== id);
        });
      });
  };

  const getAllTasks = () => {
    return getAllTasksAPI()
      .then(tasks => {
        const newTasks = tasks.map(convertFromAPI);
        setTaskData(newTasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const onHandleSubmit = (data) =>{
    return addTaskAPI(data)
      .then((result) => {
        return setTaskData((prevTasks) => [convertFromAPI(result.data), ...prevTasks]);
      });
  };

  // const testTask = {
  //   'description': 'Notice something new every day',
  //   'is_complete': false,
  //   'title': 'Go on my daily walk'
  // }
  // onHandleSubmit(testTask)
  //   .then((result) => console.log(result));


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
          handleToggleInComplete={handleToggleInComplete}
          handleDeleteTask={handleDeleteTask}/>}</div>
        <NewTaskForm onHandleSubmit={onHandleSubmit}></NewTaskForm>
      </main>
    </div>
  );
};

export default App;
