import * as actionTypes from "../actions/actions";

const initialState = {
  centerlat: 28.184855,
  centerlng: 83.99963,
};

const centerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CENTER:
      return {
        ...state,
        centerlat:action.center.lat,
        centerlng:action.center.lng,
      };
//       case actionTypes.ONINIT_DATA:
//       return {
//         state,
//       };
    default:
      return state;
  }
};

export default centerReducer;
