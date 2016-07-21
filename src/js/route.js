import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './app.js';
import NotFound from './not_found.js';
import Main from 'view/main';
import SensorList from 'view/sensor/sensor_view.js';

let route = (
    <Route path='/' component={App}>
        <IndexRoute component={SensorList}/>
        <Route path='sensorList' component={SensorList} />
        <Redirect from="woo" to="bin" />
    </Route>
);

export default route;