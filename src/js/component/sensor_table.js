import React from 'react'
import ReactDOM from 'react-dom'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class SensorTable extends React.Component {

    static defaultProps = {
        sensor_list: []
    };

    constructor(props) {
        super(props);

        console.log(props);

        var data = (props.sensor_list == null) ? [] : props.sensor_list;

        this.state = {
            table_height: (app.app_store.app_info.window_height - 30 - 50) + "px",
            sensor_list: data
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props) {
        this.state = {
            table_height: (app.app_store.app_info.window_height - 30 - 50) + "px",
            sensor_list: props.sensor_list
        }
    }

    render() {
        console.log(this.state.sensor_list.length);

        var style = {
            height:"500px"
        };

        return (
            <BootstrapTable data={this.state.sensor_list} style={style} className="scroll">
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" >ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataAlign="center">이름</TableHeaderColumn>
                <TableHeaderColumn dataField="mac_str" dataAlign="center">MAC</TableHeaderColumn>
                <TableHeaderColumn dataField="status_str" dataAlign="center">상태</TableHeaderColumn>
            </BootstrapTable>
        );
    };
}