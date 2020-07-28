import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import { AuthContext } from '../context/AuthContext';

const DeleteButton = ({ id }) => {
  const { setLoading } = useContext(AuthContext);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const willDelete = await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this task!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      });
      if (willDelete) {
        try {
          await axios({
            method: 'DELETE',
            url: `/api/tasks/${id}`,
            withCredentials: true
          });
          swal('Poof! Your task has been deleted!', {
            icon: 'success'
          });
          setLoading(false);
        } catch (error) {
          swal(`Oops!`, 'Something went wrong.');
        }
      } else {
        swal('Your task is safe!');
      }
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };
  return (
    <Button onClick={handleDelete} variant="danger">
      Delete
    </Button>
  );
};

export default DeleteButton;
