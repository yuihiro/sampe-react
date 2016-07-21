import React from "react";
import ReactDOM from "react-dom"

import {Layout,Fixed,Flex} from 'react-layout-pane';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import AppStore from 'store/app_store'
import MenuBar from 'view/main/menu_bar'
import StatusBar from 'view/main/status_bar'

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

global.app = {};

export default class App extends React.Component {

    constructor(props) {
        console.log("constructor");
        super(props);
        this.init();
    };

    state = {
        isOpenModal: false
    };

    init() {
        app.app_store = AppStore;

        var me = this;
        $(window).resize(function () {
            me.getAppSize();
        });

        


        PubSub.subscribe("MODAL_OPEN", function (mgs, data) {
            me.setState({isOpenModal: true, modal_title: data});
        });
    };

    handleOpen = () => {
        this.setState({isOpenModal: true});
    };

    handleClose = () => {
        this.setState({isOpenModal: false});
    };

    getAppSize() {
        app.app_store.app_info.window_width = $(window).innerWidth();
        app.app_store.app_info.window_height = $(window).innerHeight();
    }

    componentDidMount() {
        console.log()
        app.$app = $(ReactDOM.findDOMNode(this));
        this.getAppSize();
    };

    componentWillUnmount() {
    };

    render() {

        var style = {
            paddingTop: '60px',
            paddingDown: '60px',
            color: 'black'
        };

        return (
            <Layout type="column">

            <Fixed className="menubar">
            <MenuBar />
            </Fixed>

            <Flex>
            <Layout type="row">
            <Flex className="content">
            {this.props.children}
            </Flex>
            <Fixed className="statusbar">
            <StatusBar />
            </Fixed>
            </Layout>
            </Flex>




            </Layout>
            );
    }
}