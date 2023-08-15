import axios from "axios";

import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  FILTER_ACTIVITY,
  RESET_PAGE,
} from "./actions-types";

export const getCountries = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      dispatch({ type: GET_COUNTRIES, payload: response.data });
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
};

export const getActivities = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/activities");
      dispatch({ type: GET_ACTIVITIES, payload: response.data });
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };
};

export const filterByActivity = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/countries-by-activities?id=${id}`
      );

      return dispatch({
        type: FILTER_ACTIVITY,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const resetPage = () => {
  return {
    type: RESET_PAGE,
  };
};
