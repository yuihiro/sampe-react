import React from 'react'
import axios from 'axios'

class SensorService extends React.Component {

    constructor(props) {
        super(props);
    }

    selectSensorList() {
        var url = "/api/sensor/sensor_list";
        //var url = "https://api.github.com/users/octocat/gists";
        return axios.get(url);
    }

    selectFirmwareList() {
        var url = "/api/sensor/firmware_list";
        //var url = "https://api.github.com/users/octocat/gists";
        return axios.get(url);
    }
}

export default new SensorService();