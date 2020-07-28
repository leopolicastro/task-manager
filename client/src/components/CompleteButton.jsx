import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CompleteButton = ({ task }) => {
  const { setLoading } = useContext(AuthContext);

  const toggleComplete = async () => {
    setLoading(true);
    try {
      await axios({
        method: 'PATCH',
        url: `/api/tasks/${task._id}`,
        withCredentials: true,
        data: { completed: !task.completed }
      });
      swal('Updated', 'Your task has been updated!', 'success');
      setLoading(false);
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };
  return (
    <Button
      className="mr-2"
      onClick={toggleComplete}
      style={{ width: 150 }}
      variant={task.completed ? 'success' : 'secondary'}
    >
      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
    </Button>
  );
};

export default CompleteButton;
