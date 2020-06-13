import { SET_DARK_MODE } from "../actions/preferences";

const initialState = {
  darkMode: false,
};

function preferencesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
}

export default preferencesReducer;
