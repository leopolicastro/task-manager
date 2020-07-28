import React, { useContext } from 'react';
import moment from 'moment';
import CompleteButton from './CompleteButton';
import DeleteButton from './DeleteButton';
import { AuthContext } from '../context/AuthContext';

const Task = ({ tasks }) => {
  const { search } = useContext(AuthContext);
  const filteredTasks = tasks?.filter((task) => {
    return task.description.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {filteredTasks.map((task) => (
        <tr key={task._id}>
          <td>
            {task.completed ? (
              <strike>{task.description}</strike>
            ) : (
              task.description
            )}
          </td>
          <td>
            {task.dueDate
              ? moment(task.dueDate).format('MMM Do, YYYY')
              : 'No Due Date'}
          </td>
          <td>
            <CompleteButton task={task} />
            <DeleteButton id={task._id} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default Task;
