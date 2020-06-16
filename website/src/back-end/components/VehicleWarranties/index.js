import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as Styled from './styles';
import * as VehicleWarrantiesHooks from './hooks';

const VehicleWarranties = ({ vehicle }) => {
  const vehicleWarrantiesHook = VehicleWarrantiesHooks.useVehicleWarranties();
  const [selectedWarrantyState, setSelectedWarrantyState] = useState({});
  const [vehicleWarrantiesState, setVehicleWarrantiesState] = useState(vehicle.warranties || []);

  useEffect(() => {
    vehicleWarrantiesHook.getAllWarranties();
  }, []);

  const addWarrantyToVehicle = () => {
    vehicleWarrantiesHook.addWarrantyToVehicle({
      vehicleId: vehicle.id,
      warrantyId: selectedWarrantyState.id,
      onSuccess: () => {
        setVehicleWarrantiesState([
          ...vehicleWarrantiesState,
          selectedWarrantyState,
        ]);
      },
    });
  };

  const removeVehicleWarranty = (vehicleWarranty) => {
    vehicleWarrantiesHook.removeWarrantyFromVehicle({
      vehicleId: vehicle.id,
      warrantyId: vehicleWarranty.id,
      onSuccess: () => {
        setVehicleWarrantiesState(
          vehicleWarrantiesState.filter(
            (warranty) => warranty.id !== vehicleWarranty.id,
          ),
        );
      },
    });
  };

  return (
    <Flex flexDirection="column">
      <h4>Warranties</h4>
      {vehicleWarrantiesHook.getWarrantiesLoading ? <CircularProgress />
        : (
          <Select
            value={selectedWarrantyState}
            onChange={(event) => setSelectedWarrantyState(event.target.value)}
          >
            {vehicleWarrantiesHook.vehicleWarranties.map((warranty) => (
              <MenuItem value={warranty}>{warranty.name}</MenuItem>
            ))}
          </Select>
        )}
      <Flex mt={2} mb={2}>
        <Styled.StyledButton onClick={addWarrantyToVehicle}>Add Warranty</Styled.StyledButton>
      </Flex>
      <h4>Vehicle Warranties</h4>
      <Flex flexDirection="column">
        {vehicleWarrantiesState.length ? vehicleWarrantiesState.map((vehicleWarranty) => (
          <Flex alignItems="center">
            <p>
              -
              {vehicleWarranty.name}
            </p>
            <Flex ml={2}>
              <Styled.StyledDeleteButton onClick={() => removeVehicleWarranty(vehicleWarranty)}>
                Remove Warranty
              </Styled.StyledDeleteButton>
            </Flex>
          </Flex>
        )) : <p>This vehicle has no warranties yet</p>}
      </Flex>
    </Flex>
  );
};

VehicleWarranties.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.number,
    warranties: PropTypes.array,
  }).isRequired,
};

export default VehicleWarranties;
