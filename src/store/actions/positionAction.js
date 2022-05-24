import * as actionTypes from "./actions";

export const position = (position) => {
    return {
      type: actionTypes.POSITION,
      position:position,
    };
  };