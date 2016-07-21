import React from 'react'
import ReactDOM from 'react-dom'

import MapTree from './map_tree.js'
import MapImage from './map_image.js'

export default class MapView extends React.Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.isDataLoaded = false;
    };

    state = {
        img_src: null
    };

    componentDidMount() {
    }

    loadData() {
    };

    render() {
        var style = {
            float:"right"
        };

        return (
            <div>
                <MapTree className={style}/>
                <MapImage img_src="http://localhost:9090/img/test1.jpg" className={style}/>
            </div>

        )
    };
}

