import React from 'react'
import axios from 'axios'

class AppService extends React.Component {

    constructor(props) {
        super(props);
    }

    loadAppConfig() {
        var url = "/api/app/config";
        return axios.get(url);
    }
}

export default new AppService();