import * as actionTypes from "../actions/actions";

const initialState = {
  position:null,
  close:null
};

const positionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POSITION:
      return {
        ...state,
        position:action.position.position,
        close:action.position.close
      };
    default:
      return state;
  }
};

export default positionReducer;