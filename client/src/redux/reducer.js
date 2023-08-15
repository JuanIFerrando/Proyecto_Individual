import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  FILTER_ACTIVITY,
  RESET_PAGE,
} from "./actions-types";

const initialState = {
  countries: [],
  activities: [],
  countriesAux: [],
  originalCountries: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesAux: action.payload,
        originalCountries: action.payload,
      };

    case GET_ACTIVITIES:
      const updatedActivities = action.payload.map((activity) => ({
        ...activity,
        countryIds: activity.Countries.map((country) => country.id),
      }));
      return { ...state, activities: updatedActivities };

    case FILTER_ACTIVITY:
      //En el payload recibo un "All countries" o un array con los paises que tienen esa actividad
      if (action.payload === "All countries") {
        return { ...state, countries: state.originalCountries };
      } else {
        const countriesID = action.payload?.map((country) => country.id);

        const filteredCountries = state.countriesAux.filter((country) =>
          countriesID.includes(country.id)
        );

        return { ...state, countries: filteredCountries };
      }

    case RESET_PAGE:
      return { ...state /* , firstToShow: 0  */ };

    default:
      return state;
  }
};

export default rootReducer;
