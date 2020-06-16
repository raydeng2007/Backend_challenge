import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';

class SearchResults extends Component {
  render() {
    return (
      <Flex flexDirection="column">
        <h2>{this.props.title}</h2>
        {this.props.cars.map(({
          make, model, price, cardPhoto,
        }) => (
          <Flex justifyContent="center" flexDirection="column" p={3}>
            <div style={{ border: '1px solid #686de0' }}>
              <p>
                {make.name}
                {' '}
                {model.name}
              </p>
              <p>{price}</p>
              <p>{cardPhoto}</p>
            </div>
          </Flex>
        ))}
      </Flex>
    );
  }
}

SearchResults.propTypes = {
  cars: PropTypes.array,
  title: PropTypes.string,
};

SearchResults.defaultProps = {
  cars: [],
  title: 'Results',
};

export default SearchResults;
