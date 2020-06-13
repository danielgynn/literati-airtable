import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { ThemeContext } from 'archetype-ui';

import GlobalStyle from '../themes/globalStyle';
import { core_theme } from '../themes/core_theme';
import { light_theme } from '../themes/light_theme';
import routes from '../config/router';
import Loader from '../components/Loader/Loader';

class Routes extends Component {
    returnRoutes() {
        return routes.map((route) => <Route key={route.path} {...route} />);
    }

    render() {
        const { darkMode } = this.props;

        return (
            <ThemeContext theme={darkMode ? core_theme : light_theme}>
                <Router>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {this.returnRoutes()}
                            <Redirect from='*' to='home' />
                        </Switch>
                    </Suspense>
                </Router>
                <GlobalStyle />
            </ThemeContext>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        darkMode: state.preferences.darkMode
	};
}

export default connect(mapStateToProps, null)(Routes);
