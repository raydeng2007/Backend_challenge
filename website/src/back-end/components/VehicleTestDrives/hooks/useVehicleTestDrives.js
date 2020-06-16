import axios from 'axios';

const useVehicleTestDrives = () => {
  const createTestDrive = ({ vehicleId, payload }) => {
    try {
      axios.post(`${process.env.REACT_APP_BACK_END_API_HOST}/vehicles/${vehicleId}/test-drive`, payload);
    } catch (error) {
      console.log('Create test drive error', error);
    }
  };

  return {
    createTestDrive,
  };
};

export default useVehicleTestDrives;
