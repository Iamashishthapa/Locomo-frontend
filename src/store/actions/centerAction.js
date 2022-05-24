import * as actionTypes from "./actions";

export const center = (center) => {
  return {
    type: actionTypes.CENTER,
    center:center,
  };
};

// export const oninitdata = () => {
//   return {
//     type: actionTypes.ONINIT_DATA,
//   };
// };
