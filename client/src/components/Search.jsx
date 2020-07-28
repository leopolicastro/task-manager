import React, { useContext } from 'react';
import { FormControl } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const { setSearch } = useContext(AuthContext);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <FormControl
        type="text"
        placeholder="Search tasks..."
        className="mb-4"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
