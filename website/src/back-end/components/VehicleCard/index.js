import React, { useState } from 'react';
import PropTypes from 'prop-types';

import VehicleModal from '../VehicleModal';

import * as Styled from './styles';

const VehicleCard = ({ vehicle }) => {
  const [vehicleModalVisibleState, setVehicleModalVisibleState] = useState(false);

  return (
    <>
      <Styled.Container onClick={() => setVehicleModalVisibleState(true)}>
        <Styled.ImageContainer>
          <Styled.ImageStyles src={vehicle.imageUrl} />
        </Styled.ImageContainer>
        <Styled.NameContainer>
          {vehicle.name}
          {' '}
          - $
          {vehicle.price}
        </Styled.NameContainer>
      </Styled.Container>
      <VehicleModal
        vehicle={vehicle}
        open={vehicleModalVisibleState}
        onClose={() => setVehicleModalVisibleState(false)}
      />
    </>
  );
};

VehicleCard.propTypes = {
  vehicle: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default VehicleCard;
