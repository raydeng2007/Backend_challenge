import { useState } from 'react';
import axios from 'axios';
import { useBooleanState } from '@clutch/hooks';

const useVehicleWarranties = () => {
  const getWarrantiesLoadingState = useBooleanState();
  const [vehicleWarrantiesState, setVehicleWarrantiesState] = useState([]);

  const getAllWarranties = async () => {
    try {
      getWarrantiesLoadingState.setTrue();
      const allWarrantiesResponse = await axios.get(`${process.env.REACT_APP_BACK_END_API_HOST}/warranties`);
      setVehicleWarrantiesState(allWarrantiesResponse.data);
    } catch (error) {
      console.log('Get warranties Error', error);
    } finally {
      getWarrantiesLoadingState.setFalse();
    }
  };

  const addWarrantyToVehicle = async ({ vehicleId, warrantyId, onSuccess }) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACK_END_API_HOST}/vehicles/${vehicleId}/warranties/${warrantyId}`);
      onSuccess();
    } catch (error) {
      console.log('Add warranty Error', error);
    }
  };

  const removeWarrantyFromVehicle = async ({ vehicleId, warrantyId, onSuccess }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACK_END_API_HOST}/vehicles/${vehicleId}/warranties/${warrantyId}`);
      onSuccess();
    } catch (error) {
      console.log('Delete warranty Error', error);
    }
  };

  return {
    getAllWarranties,
    vehicleWarranties: vehicleWarrantiesState,
    getWarrantiesLoading: getWarrantiesLoadingState.value,
    addWarrantyToVehicle,
    removeWarrantyFromVehicle,
  };
};

export default useVehicleWarranties;
