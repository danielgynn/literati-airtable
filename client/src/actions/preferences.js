export const SET_DARK_MODE = "SET_DARK_MODE";

export function setDarkMode(state) {
  return {
    type: SET_DARK_MODE,
    payload: state,
  };
}
