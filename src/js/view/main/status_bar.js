import React from 'react'
import ReactDOM from 'react-dom'

import FlatButton from 'material-ui/lib/flat-button';
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';

import {Checkbox} from 'material-ui';

import MainService from 'service/main_service'

export default class StatusBar extends React.Component {

    static defaultProps = {};

    state = {
        sensor_cnt: 0,
        ap_cnt: 0
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.interval = null;
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.updateData = this.updateData.bind(this);

        this.toggleUpdate(null, true);
        this.updateData();
    }

    componentDidMount() {
    }

    toggleUpdate(event, checked) {
        if (checked == true) {
            this.interval = setInterval(this.updateData, 5000);
        } else {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    updateData() {
        var me = this;
        MainService.loadStatus()
            .then(function (response) {
                var result = response.data;
                var ap_total = result.sensor_status.total_cnt;
                var sensor_total = result.ap_status.total_cnt
                var state = {
                    sensor_cnt: ap_total,
                    ap_cnt: sensor_total
                };
                me.setState(state);
            })
            .then(function (response) {
            });
    }

    clickSensor = (event, data) => {
        console.log(event);
        console.log(data);
        PubSub.publish("MODAL_OPEN", {title: "하하"});
    };

    render() {
        var style = {
            display: "inline-block",
            width: "200px",
            height: "50px",
            verticalAlign: "middle",
        }

        return (
            <div >

                <Badge badgeContent={this.state.sensor_cnt} primary={true} badgeStyle={{top: 30, right: 15}}>
                    <IconButton tooltip="센서" tooltipPosition="top-center" onTouchTap={this.clickSensor} name="bbb">
                        <NotificationsIcon />
                    </IconButton>
                </Badge>
                <Badge badgeContent={this.state.ap_cnt} secondary={true} badgeStyle={{top: 30, right: 15}}>
                    <IconButton tooltip="AP" tooltipPosition="top-center">
                        <NotificationsIcon/>
                    </IconButton>
                </Badge>

                <div style={style}>
                    <Checkbox value="true" label="업데이트" defaultChecked={true} onCheck={this.toggleUpdate} width="100px"/>
                </div>

            </div>
        )
    };
}
