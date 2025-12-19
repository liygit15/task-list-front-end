import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({onHandleSubmit}) => {
  const [title, setTitle] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleIsComplete = (event) => {
    // console.log(event.target.value);
    const value = event.target.value;
    setIsComplete(value === 'yes');
};

  const handleSubmit = (event) =>{
    event.preventDefault();

    const newTask = {
      title,
      is_complete: isComplete,
      description: 'test task',
    };
    onHandleSubmit(newTask);

    setTitle('');
    setIsComplete(false);
  };

  return (
    <div>
      <h1>Add a task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
        </div>
        <label htmlFor="isComplete">isComplete</label>
        <select
          id="isComplete"
          name="isComplete"
          value={isComplete ? 'yes' : 'no'}
          onChange={handleIsComplete}
        >
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
        </select>
        <div>
          <input type="submit" value="Add Task" />
        </div>
      </form>
    </div>
  );
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func,
};

export default NewTaskForm;
