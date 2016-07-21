import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router';

export default class MenuBar extends React.Component {

    constructor(props) {
        super(props);
    }

    menu_click(event) {
        var input = event.target.value;
    }


    render() {
        return (
            <div >
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span
                        className="icon-bar"></span> <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">WIPS</a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><Link to="dashboard">실시간현황</Link>
                        </li>
                        <li><Link to="sensor">센서관리</Link>
                        </li>
                        <li><Link to="ap">AP관리</Link>
                        </li>
                        <li><Link to="station">단말관리</Link>
                        </li>
                        <li className="divider"></li>
                        <li><Link to="access">접속관리</Link>
                        </li>
                        <li><Link to="map">지도</Link>
                        </li>
                        <li><Link to="config">환경설정</Link>
                        </li>
                    </ul>
                </div>
            </ div >
        )
    };
}



