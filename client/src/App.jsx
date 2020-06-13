import React, { Component } from "react";
import { Provider } from "react-redux";
import { ThemeContext } from "archetype-ui";

import axios from "./config/axios";
import configureStore from "./configureStore";
import { loadState, saveState } from "./localStorage";
import Routes from "./pages/Routes";

import "archetype-ui/dist/styles.css";
import "./index.css";

const persistedState = loadState();

const store = configureStore(persistedState);

store.subscribe(() => {
    saveState(store.getState());
});

if (store.getState().auth && store.getState().auth.authToken) {
    axios.defaults.headers.common["Authorization"] = `bearer ${
        store.getState().auth.authToken
    }`;
    axios.defaults.headers.get["Authorization"] = `bearer ${
        store.getState().auth.authToken
    }`;
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

export default App;
