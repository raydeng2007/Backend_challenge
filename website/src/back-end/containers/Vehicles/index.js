import React, { useEffect, useContext } from 'react';
import { Flex } from 'rebass';
import { withProvider } from '@clutch/hooks';
import CircularProgress from '@material-ui/core/CircularProgress';

import VehicleGrid from '../../components/VehicleGrid';
import Filter from '../../components/Filter';
import NewVehicleModal from '../../components/NewVehicleModal';
import { VehiclesProvider, VehiclesContext } from './context';

import * as Styled from './styles';

const Vehicles = () => {
  const vehiclesContext = useContext(VehiclesContext);

  useEffect(() => {
    vehiclesContext.getVehicles();
  }, []);

  return (
    <Flex p={3} flex={1} flexDirection="column">
      <h1>Vehicles</h1>
      <NewVehicleModal />
      <Flex flex={3}>
        <Flex mr={2} flex={2} flexDirection="column">
          <Flex flex={1} mb={2}>
            {vehiclesContext.getVehiclesLoading
              ? <CircularProgress />
              : <VehicleGrid />}
          </Flex>
          <Flex alignItems="center">
            <Flex mr={3}>
              <Styled.StyledButton
                onClick={() => {
                  vehiclesContext.setQueryParamsState({
                    ...vehiclesContext.queryParamsState,
                    page: vehiclesContext.queryParamsState.page - 1,
                  });
                }}
              >
                Previous Page
              </Styled.StyledButton>
            </Flex>
            {vehiclesContext.queryParamsState.page}
            <Flex ml={3}>
              <Styled.StyledButton
                onClick={() => {
                  vehiclesContext.setQueryParamsState({
                    ...vehiclesContext.queryParamsState,
                    page: vehiclesContext.queryParamsState.page + 1,
                  });
                }}
              >
                Next Page
              </Styled.StyledButton>
            </Flex>
          </Flex>
        </Flex>
        <Flex ml={2} flex={1}>
          <Filter />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withProvider(VehiclesProvider, Vehicles);
