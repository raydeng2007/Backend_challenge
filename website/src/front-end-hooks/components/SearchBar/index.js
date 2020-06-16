import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const SearchBar = ({ onChange }) => (
  <TextField
    id="search"
    placeholder="Search car makes"
    style={{ width: '100%' }}
    onChange={onChange}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
