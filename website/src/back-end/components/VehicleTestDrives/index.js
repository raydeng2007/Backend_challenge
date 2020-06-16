import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import TextField from '@material-ui/core/TextField';

import * as VehicleTestDrivesHooks from './hooks';
import * as Styled from './styles';

const VehicleTestDrives = ({ vehicle }) => {
  const vehicleTestDriveHook = VehicleTestDrivesHooks.useVehicleTestDrives();

  const [formState, setFormState] = useState({ });

  const createTestDrive = () => {
    vehicleTestDriveHook.createTestDrive({ vehicleId: vehicle.id, payload: formState });
  };

  return (
    <Flex flexDirection="column">
      <h4>Create Test Drive</h4>
      <h6>
        Date:
      </h6>
      <TextField
        type="date"
        value={formState.date}
        onChange={(event) => {
          setFormState({
            ...formState,
            date: event.target.value,
          });
        }}
      />
      <h6>
        Contact email:
      </h6>
      <TextField
        type="email"
        value={formState.contactEmail}
        onChange={(event) => {
          setFormState({
            ...formState,
            contactEmail: event.target.value,
          });
        }}
      />
      <h6>
        Contact name:
      </h6>
      <TextField
        value={formState.contactName}
        onChange={(event) => {
          setFormState({
            ...formState,
            contactName: event.target.value,
          });
        }}
      />
      <h6>
        Contact age:
      </h6>
      <TextField
        type="number"
        value={formState.contactAge}
        onChange={(event) => {
          setFormState({
            ...formState,
            contactAge: event.target.value,
          });
        }}
      />
      <Flex mt={2}>
        <Styled.StyledButton onClick={createTestDrive}>Create Test Drive</Styled.StyledButton>
      </Flex>
    </Flex>
  );
};

VehicleTestDrives.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
export default VehicleTestDrives;
