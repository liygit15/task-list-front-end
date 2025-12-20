import { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultFormState = {
  title: '',
  isComplete: false,
  description: ''
};

const NewTaskForm = ({onHandleSubmit}) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange =(event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;
    // console.log(inputName, inputValue);
    setFormData (formData => {
      return {
        ...formData,
        [inputName]: inputValue
      };
    });
    // console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      ...formData,
      is_complete: formData.isComplete === 'yes'
    };
    delete newTask.isComplete;
    console.log(newTask)
    onHandleSubmit(newTask);
    setFormData(kDefaultFormState);
  };

  const makeControlledInput = (inputName) => {
    return (
      <div>
        <lable htmlFor={inputName}>
          {inputName}
        </lable>
        <input
          type='text'
          name={inputName}
          id={`input-${inputName}`}
          value={formData[inputName]}
          onChange={handleChange}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Add a task</h1>
      <form onSubmit={handleSubmit}>
        {makeControlledInput('title')}
        {makeControlledInput('description')}

        <label htmlFor="isComplete">isComplete</label>
        <select
          id="isComplete"
          name="isComplete"
          value={formData.isComplete ? 'yes' : 'no'}
          onChange={handleChange}
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
