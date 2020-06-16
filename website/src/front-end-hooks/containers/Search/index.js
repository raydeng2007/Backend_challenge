import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { Flex } from 'rebass';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';

import * as Styled from './styles';

const Search = () => {
  const [searchValueState, setSearchValueState] = useState('');
  const [carsState, setCarsState] = useState([]);

  const searchCars = async () => {
    const allCarsResponse = await fetch('https://api.clutch.ca/v1/vehicles');
    const allCars = await allCarsResponse.json();
    const resultCars = allCars.vehicles.filter(
      ({ make }) => make.name.includes(searchValueState),
    );
    setCarsState(resultCars);
  };

  useEffect(() => {
    searchCars();
  }, []);

  const onSearchInputChange = (event) => {
    setSearchValueState(event.target.value);
  };

  return (
    <Styled.Container justifyContent="space-between">
      <Flex flexDirection="column" p={3} width={1}>
        <Flex pb={4} width={1} flexDirection="column">
          <Card raised>
            <Flex p={3} width={1}>
              <SearchBar onChange={onSearchInputChange} />
            </Flex>
          </Card>
        </Flex>
        <Card raised>
          <Flex p={3}>
            <SearchResults cars={carsState} />
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
};

export default Search;
