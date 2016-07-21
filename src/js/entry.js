import React from "react";
import ReactDOM from "react-dom"
import $ from "jquery";
import pace from "pace";
import _ from "underscore";
import PubSub from 'pubsub-js'

import Root from './root.js'

global.$ = global.jQuery = $;
global.PubSub = PubSub;
global._ = _;

require("jqtree");

$(function () {
    console.log("ready go");
    reactdom.render(<root/>, document.getelementbyid('app'));
});