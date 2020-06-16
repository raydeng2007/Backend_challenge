import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class SearchBar extends Component {
  render() {
    return (
      <TextField
        id="search"
        placeholder="Search car makes"
        style={{ width: '100%' }}
        onChange={this.props.onChange}
      />
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
