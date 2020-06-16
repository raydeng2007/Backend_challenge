import React, { useContext } from 'react';
import { Flex } from 'rebass';

import VehicleCard from '../VehicleCard';
import { VehiclesContext } from '../../containers/Vehicles/context';

const VehicleGrid = () => {
  const vehiclesContext = useContext(VehiclesContext);

  return (
    <Flex flex={1} flexWrap="wrap">
      {vehiclesContext.allVehicles.map((vehicle) => (
        <VehicleCard key={vehicle.name} vehicle={vehicle} />
      ))}
    </Flex>
  );
};


export default VehicleGrid;
