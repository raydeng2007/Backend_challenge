import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useUpdateOnlyEffect, useBooleanState } from '@clutch/hooks';
import axios from 'axios';

export const VehiclesContext = createContext();

export const VehiclesProvider = ({ children }) => {
  const getVehiclesLoadingState = useBooleanState();
  const addVehiclesLoadingState = useBooleanState();
  const [queryParamsState, setQueryParamsState] = useState({
    onlyHonda: false,
    page: 0,
  });
  const [allVehiclesState, setAllVehiclesState] = useState([]);

  const getVehicles = async () => {
    try {
      getVehiclesLoadingState.setTrue();
      const vehiclesResponse = await axios.get(`${process.env.REACT_APP_BACK_END_API_HOST}/vehicles`, { params: queryParamsState });
      setAllVehiclesState(vehiclesResponse.data);
    } catch (error) {
      console.log('fetching vehicle error', error);
    } finally {
      getVehiclesLoadingState.setFalse();
    }
  };

  const addVehicle = async ({ payload, onSuccess }) => {
    try {
      addVehiclesLoadingState.setTrue();
      await axios.post(`${process.env.REACT_APP_BACK_END_API_HOST}/vehicles`, payload);
      await getVehicles();
      onSuccess();
    } catch (error) {
      console.log('creating vehicle error', error);
    } finally {
      addVehiclesLoadingState.setFalse();
    }
  };

  useUpdateOnlyEffect(() => {
    getVehicles();
  }, [JSON.stringify(queryParamsState)]);

  return (
    <VehiclesContext.Provider
      value={{
        getVehicles,
        allVehicles: allVehiclesState,
        addVehicle,
        queryParamsState,
        setQueryParamsState,
        getVehiclesLoading: getVehiclesLoadingState.value,
        addVehiclesLoading: addVehiclesLoadingState.value,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};

VehiclesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default VehiclesContext;
