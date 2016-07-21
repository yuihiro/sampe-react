import React from 'react'
import ReactDOM from 'react-dom'

import TodoList from 'component/sensor_table.js'
import SensorService from 'service/sensor_service.js'

let items = [];
items.push("Buy ingredients for Crock Pot");
items.push("Pick up chair at IKEA");
items.push("Go see mom");
items.push("GoGo");

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        const url = 'https://api.github.com/users/octocat/gists';
    }

    menu_click(event) {
        var input = event.target.value;
        //this.props.addEvent({ newItem });
    }

    render() {
        return (
            <div>
                <TodoList items={items}/>
            </div>
        )
    };
}


