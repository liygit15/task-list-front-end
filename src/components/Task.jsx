// import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, handleToggleComplete, handleDeleteTask }) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => {handleToggleComplete(id);}}
      >
        {title}
      </button>
      <button 
        className="tasks__item__remove button"
        onClick={() => {handleDeleteTask(id);}}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  handleToggleComplete:PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func
};

export default Task;
