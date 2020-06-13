import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const middleware = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middleware.push(logger);
}

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(...middleware))
  );
}
