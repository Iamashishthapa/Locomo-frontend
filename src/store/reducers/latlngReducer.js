import * as actionTypes from "../actions/actions";

const initialState = {
  latdestination: null,
  lngdestination: null,
  latorigin: null,
  lngorigin: null,
  time: null,
  loaded: false,
};

const latlngReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LAT_LNG:
      return {
        ...state,
        latdestination: action.latlng.latdestination,
        lngdestination: action.latlng.lngdestination,
        loaded: action.latlng.loaded,
        latorigin: action.latlng.latorigin,
        lngorigin: action.latlng.lngorigin,
        time: action.latlng.time,
      };
    default:
      return state;
  }
};

export default latlngReducer;
