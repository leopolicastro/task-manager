import React, { useState, useEffect, createContext } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [currentFilter, setCurrentFilter] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    // incase user refreshes local session is cleared.
    if (user && !currentUser) {
      axios
        .get(`/api/users/me`, {
          withCredentials: true
        })
        .then(({ data }) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          swal(`Oops!`, error.toString());
        });
    }
  }, [currentUser, user]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        tasks,
        setTasks,
        search,
        setSearch,
        currentFilter,
        setCurrentFilter,
        setFilteredTasks,
        filteredTasks,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
