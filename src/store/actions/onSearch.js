import * as actionTypes from "./actions";

export const onSearch = (center) => {
    return {
      type: actionTypes.ON_SEARCH,
      center:center,
    };
  };