import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({onHandleSubmit}) => {
  const [taskTitle, setTasktitle] = useState('');

  const handleTaskTitleChange = (event) => {
    setTasktitle(event.target.value);
  };

  const handleSubmit = (event) =>
  {
    event.preventDefault();
    const newTask = {
      taskTitle,
      isCompleted: false,
      description: 'test desy',
    };
    onHandleSubmit(newTask);
    setTasktitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskTitle">Task Title</label>
      <input type="text" id="taskTitle" name="taskTitle" value={taskTitle} onChange={handleTaskTitleChange} />
      <div>
        <input type="submit" value="Add a task" />
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func,
};

export default NewTaskForm;
