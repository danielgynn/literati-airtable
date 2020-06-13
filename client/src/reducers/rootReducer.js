import { combineReducers } from "redux";

import preferencesReducer from "./preferences";

const rootReducer = combineReducers({
  preferences: preferencesReducer,
});

export default rootReducer;
