import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import DateFilters from '../components/DateFilters';

const Home = () => {
  return (
    <div>
      <DateFilters />
      <TaskList />
      <TaskForm />
    </div>
  );
};

export default Home;
