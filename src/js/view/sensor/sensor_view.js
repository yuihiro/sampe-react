import React from 'react'
import ReactDOM from 'react-dom'
import {Layout,Fixed,Flex} from 'react-layout-pane';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import SensorTable from 'component/sensor_table'
import FirmwareTable from 'component/firmware_table'
import SensorService from 'service/sensor_service'

export default class SensorView extends React.Component {

    static defaultProps = {};

    constructor(props) {
        super(props);

        console.log("흠");
        this.isInited = false;
        this.current_tab = "0";
    };

    state = {
        sensor_list: null,
        firmware_list: null,
        current_tab: "0"
    };

    componentDidMount() {
        this.initElement();
    }

    componentWillUnmount() {
    };

    initElement() {
        this.loadData();
        console.log($('#test'));

        var data = [
            {
                label: 'node1', id: 1,
                children: [
                    {label: 'child1', id: 2},
                    {label: 'child2', id: 3}
                ]
            },
            {
                label: 'node2', id: 4,
                children: [
                    {label: 'child3', id: 5}
                ]
            }
        ];
        $('#menu').tree({data: data, autoOpen: true});
        $('#menu').bind('tree.click', function (event) {
            alert(event.node.name);
        });
    }

    loadData() {
        console.log(this.current_tab);
        let me = this;
        if (this.current_tab == "0") {
            console.log("로드1");
            SensorService.selectSensorList()
                .then(function (response) {
                    console.log("왔다");
                    me.setState({sensor_list: response.data});
                })
                .then(function (response) {
                });
        } else {
            SensorService.selectFirmwareList()
                .then(function (response) {
                    me.setState({firmware_list: response.data});
                })
                .then(function (response) {
                });
        }
    };

    changeTab = (value) => {
        console.log("changeTab");
        this.current_tab = value;
        this.loadData();
    };

    activeTab = (value) => {
        console.log(value);
    };

    render() {
        this.isInited = true;
        console.log("렌더");

        var style = {
            float: "left",
            width: "100px"
        }

        return (
            <div className="wrap">
                <Tabs ref="tab" onChange={this.changeTab}>
                    <Tab label="센서 목록" value="0" onActive={this.activeTab}>
                        <Layout type="row">
                            <Fixed className="sidebar">
                                <div id="menu" className="wrap"/>
                            </Fixed>
                            <Flex>
                                <SensorTable sensor_list={this.state.sensor_list}/>
                            </Flex>
                        </Layout>
                    </Tab>
                    <Tab label="센서 관리" value="1" onActive={this.activeTab}>
                        <p>
                            This is another example of a tab template!
                        </p>
                    </Tab>
                    <Tab label="펌웨어 관리" value="2" onActive={this.activeTab}>
                        <FirmwareTable sensor_list={this.state.firmware_list}/>
                    </Tab>
                </Tabs>
            </div>
        )
    };
}

