import React, { useState, useContext } from 'react';
import { Flex } from 'rebass';
import { Modal, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { VehiclesContext } from '../../containers/Vehicles/context';

import * as Styled from './styles';

const NewVehicleModal = () => {
  const vehiclesContext = useContext(VehiclesContext);
  const [formState, setFormState] = useState({
    name: '',
    imageUrl: '',
    price: 0,
  });
  const [showVehicleModalState, setShowVehicleModalState] = useState(false);

  const addVehicle = () => {
    vehiclesContext.addVehicle({
      payload: formState,
      onSuccess: () => setShowVehicleModalState(false),
    });
  };

  return (
    <Flex mb={3}>
      <Styled.StyledButton onClick={() => {
        setShowVehicleModalState(!showVehicleModalState);
      }}
      >
        Add Vehicle
      </Styled.StyledButton>
      <Modal open={showVehicleModalState} onClose={() => setShowVehicleModalState(false)}>
        <Styled.ModalContainer>
          <h2>New Vehicle</h2>
          <h4>Name:</h4>
          <TextField
            value={formState.name}
            onChange={(event) => {
              setFormState({
                ...formState,
                name: event.target.value,
              });
            }}
          />
          <h4>Image Url:</h4>
          <TextField
            value={formState.imageUrl}
            onChange={(event) => {
              setFormState({
                ...formState,
                imageUrl: event.target.value,
              });
            }}
          />
          <h4>Price:</h4>
          <TextField
            type="number"
            value={formState.price}
            onChange={(event) => {
              setFormState({
                ...formState,
                price: event.target.value,
              });
            }}
          />
          <Flex mt={2}>
            {vehiclesContext.addVehiclesLoading
              ? <CircularProgress />
              : <Styled.StyledButton onClick={addVehicle}>Add Vehicle</Styled.StyledButton>}
          </Flex>
        </Styled.ModalContainer>
      </Modal>
    </Flex>
  );
};

export default NewVehicleModal;
