import { useState } from 'react';
import axios from 'axios';

const useVehicleModal = () => {
  const [relatedVehiclesState, setRelatedVehiclesState] = useState([]);

  const deleteVehicle = async ({ vehicleId, onSuccess }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACK_END_API_HOST}/vehicles/${vehicleId}`);
      onSuccess();
    } catch (error) {
      console.log('Delete vehicle error', error);
    }
  };

  const findRelatedVehicles = async (vehicleId) => {
    try {
      const relatedVehiclesResponse = await axios.get(`${process.env.REACT_APP_BACK_END_API_HOST}/vehicles/${vehicleId}/relatedVehicles`);
      setRelatedVehiclesState(relatedVehiclesResponse.data);
    } catch (error) {
      console.log('Related vehicle error', error);
    }
  };

  return {
    deleteVehicle,
    findRelatedVehicles,
    relatedVehicles: relatedVehiclesState,
  };
};

export default useVehicleModal;
