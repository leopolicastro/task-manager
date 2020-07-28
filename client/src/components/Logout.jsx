import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import swal from 'sweetalert';
import axios from 'axios';

const Logout = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/users/logout',
        withCredentials: true
      });
      sessionStorage.removeItem('user');
      setCurrentUser(null);
      swal(response.data.message, 'You have signed out!', 'success').then(() =>
        history.push('/login')
      );
    } catch (error) {
      swal('Oops!', 'Something went wrong.');
    }
  };

  return <Dropdown.Item onClick={handleSignOut}>Logout</Dropdown.Item>;
};

export default Logout;
