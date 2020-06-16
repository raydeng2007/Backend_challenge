import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@material-ui/core';
import { Flex } from 'rebass';

import { VehiclesContext } from '../../containers/Vehicles/context';
import VehicleWarranties from '../VehicleWarranties';
import VehicleTestDrives from '../VehicleTestDrives';

import * as VehicleModalHooks from './hooks';
import * as Styled from './styles';

const VehicleModal = ({ open, onClose, vehicle }) => {
  const vehiclesContext = useContext(VehiclesContext);
  const vehicleModalHook = VehicleModalHooks.useVehicleModal();

  const deleteVehicle = () => {
    vehicleModalHook.deleteVehicle({
      vehicleId: vehicle.id,
      onSuccess: async () => {
        await vehiclesContext.getVehicles();
        onClose();
      },
    });
  };

  const findRelatedVehicles = () => {
    vehicleModalHook.findRelatedVehicles(vehicle.id);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Styled.ModalContainer>
        <h2>{vehicle.name}</h2>
        <Flex flex={3}>
          <Flex flex={1} flexDirection="column">
            <Flex mb={2}>
              <Styled.StyledButton onClick={deleteVehicle}>Delete Vehicle</Styled.StyledButton>
            </Flex>
            <Flex mb={2}>
              <Styled.StyledButton
                onClick={findRelatedVehicles}
              >
                Find Related Vehicles
              </Styled.StyledButton>
            </Flex>
            {!!vehicleModalHook.relatedVehicles.length && (
              vehicleModalHook.relatedVehicles.map((relatedVehicle) => (
                <Flex mb={2}>{relatedVehicle.name}</Flex>
              ))
            )}
          </Flex>
          <Flex flex={1}>
            <VehicleWarranties vehicle={vehicle} />
          </Flex>
          <Flex flex={1}>
            <VehicleTestDrives vehicle={vehicle} />
          </Flex>
        </Flex>
      </Styled.ModalContainer>
    </Modal>
  );
};

VehicleModal.propTypes = {
  vehicle: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VehicleModal;
