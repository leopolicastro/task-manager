import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import dueFilter from '../helpers/DueFilter';
import { AuthContext } from '../context/AuthContext';

const DateFilters = () => {
  const { tasks, setFilteredTasks, currentFilter } = useContext(AuthContext);

  const filters = ['Due Soon', 'Due Later', 'Past Due', 'Not Due', 'All'];

  const filterByDate = (query) => {
    dueFilter(query, tasks, setFilteredTasks);
  };

  const filterClass = (filter) => {
    let className = '';
    switch (filter) {
      case 'Due Soon':
        className = `badge badge-warning ${
          currentFilter === 'Due Soon' ? 'badge-lg' : 'badge-sm'
        }`;
        break;
      case 'Due Later':
        className = `badge badge-success ${
          currentFilter === 'Due Later' ? 'badge-lg' : 'badge-sm'
        }`;
        break;
      case 'Past Due':
        className = `badge badge-danger ${
          currentFilter === 'Past Due' ? 'badge-lg' : 'badge-sm'
        }`;
        break;
      case 'Not Due':
        className = `badge badge-secondary ${
          currentFilter === 'Not Due' ? 'badge-lg' : 'badge-sm'
        }`;
        break;
      case 'All':
        className = `badge badge-dark badge-sm`;
        break;
      default:
        className = 'badge';
    }
    return className;
  };

  return (
    <Container className="mt-4">
      <ul>
        {filters.map((filter, i) => (
          <li
            key={i}
            className={`${filterClass(filter)} mr-2`}
            onClick={() => filterByDate(filter)}
          >
            {filter}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default DateFilters;
