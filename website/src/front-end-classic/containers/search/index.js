import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { Flex } from 'rebass';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';

import * as Styled from './styles';

class Search extends Component {
  state = {
    searchValue: '',
    cars: [],
  }

  componentDidMount() {
    this.searchCars();
  }

  onSearchInputChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  }

  searchCars = async () => {
    const allCarsResponse = await fetch('https://api.clutch.ca/v1/vehicles');
    const allCars = await allCarsResponse.json();
    const resultCars = allCars.vehicles.filter(
      ({ make }) => make.name.includes(this.state.searchValue),
    );
    this.setState({
      cars: resultCars,
    });
  }

  render() {
    return (
      <Styled.Container justifyContent="space-between">
        <Flex flexDirection="column" p={3} width={1}>
          <Flex pb={4} width={1} flexDirection="column">
            <Card raised>
              <Flex p={3} width={1}>
                <SearchBar onChange={this.onSearchInputChange} />
              </Flex>
            </Card>
          </Flex>
          <Card raised>
            <Flex p={3}>
              <SearchResults cars={this.state.cars} />
            </Flex>
          </Card>
        </Flex>
        <Flex width={1} flexDirection="column" p={3}>
          <Card raised>
            <Flex p={3} width={1}>
              <SearchResults cars={[]} title="My favorites" />
            </Flex>
          </Card>
        </Flex>
      </Styled.Container>
    );
  }
}

export default Search;
