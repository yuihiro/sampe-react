import React from "react";
import ReactDOM from "react-dom"

import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';

import App from './app.js';
import NotFound from './not_found.js';

import SensorView from 'view/sensor/sensor_view.js';
import ApView from 'view/sensor/ap_view.js';
import MapView from 'view/map/map_view.js';

export default class Root extends React.Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={SensorView}/>
                    <Route path='sensor' component={SensorView} />
                    <Route path='ap' component={ApView} />
                    <Route path='map' component={MapView} />
                    <Redirect from="woo" to="bin" />
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
}