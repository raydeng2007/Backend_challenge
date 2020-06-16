import React, { useContext } from 'react';
import { Flex } from 'rebass';
import Checkbox from '@material-ui/core/Checkbox';

import { VehiclesContext } from '../../containers/Vehicles/context';

const Filter = () => {
  const vehiclesContext = useContext(VehiclesContext);

  return (
    <Flex flexDirection="column">
      <h2>Filter</h2>
      <Flex alignItems="center">
        <Flex mr={2}>
          <Checkbox
            checked={vehiclesContext.queryParamsState.onlyHonda}
            onChange={() => {
              vehiclesContext.setQueryParamsState({
                ...vehiclesContext.queryParamsState,
                onlyHonda: !vehiclesContext.queryParamsState.onlyHonda,
              });
            }}
          />
        </Flex>
        Hondas
      </Flex>
    </Flex>
  );
};

export default Filter;
