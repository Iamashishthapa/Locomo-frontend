import * as actionTypes from "./actions";

export const latlng = (latlng) => {
    return {
      type: actionTypes.LAT_LNG,
      latlng:latlng,
    };
  };