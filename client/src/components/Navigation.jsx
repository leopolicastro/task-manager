import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, Image, Dropdown, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import dueFilter from '../helpers/DueFilter';
import swal from 'sweetalert';

import Logout from './Logout';
import axios from 'axios';

const Navigation = () => {
  const [active, setActive] = useState({
    completed: false,
    pending: false
  });
  const {
      setCurrentUser,
      currentUser,
      tasks,
      setFilteredTasks,
      setCurrentFilter
    } = useContext(AuthContext),
    { push } = useHistory();
  const filterCompleted = (query) => {
    dueFilter(query, tasks, setFilteredTasks);
    setCurrentFilter(query);
  };

  const handleClick = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/users/logout',
        withCredentials: true
      });
      sessionStorage.removeItem('user');
      setCurrentUser(null);
      swal(response.data.message, 'You have signed out!', 'success').then(() =>
        push('/login')
      );
    } catch (error) {
      swal('Oops!', 'Something went wrong.');
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Task Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {currentUser && (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item
              className="mr-2"
              onClick={() => filterCompleted('Completed')}
              onMouseEnter={() => setActive({ ...active, completed: true })}
              onMouseLeave={() => setActive({ ...active, completed: false })}
              style={{
                cursor: 'pointer',
                textDecoration: active.completed ? 'underline' : 'none'
              }}
            >
              Completed
            </Nav.Item>
            <Nav.Item
              onClick={() => filterCompleted('Pending')}
              onMouseEnter={() => setActive({ ...active, pending: true })}
              onMouseLeave={() => setActive({ ...active, pending: false })}
              style={{
                cursor: 'pointer',
                textDecoration: active.pending ? 'underline' : 'none'
              }}
            >
              Pending
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              {currentUser?.avatar ? (
                <Dropdown drop="down" style={{}} className="mr-1">
                  <Dropdown.Toggle variant="">
                    <Image
                      src={currentUser.avatar}
                      height={50}
                      width={50}
                      roundedCircle
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Logout />
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <span>Hi, {currentUser.name}</span>

                  <Link className="mx-4" to="/profile">
                    Profile
                  </Link>
                  <Button onClick={handleClick}>Logout</Button>
                </>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Navigation;
