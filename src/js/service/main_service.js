import React from 'react'
import axios from 'axios'

class MainService extends React.Component {

    constructor(props) {
        super(props);
    }

    loadStatus() {
        var url = "/api/main/status";
        return axios.get(url);
    }
}

export default new MainService();