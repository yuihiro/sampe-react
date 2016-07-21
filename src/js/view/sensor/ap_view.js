import React from 'react'
import ReactDOM from 'react-dom'

import {Layout,Fixed,Flex} from 'react-layout-pane';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';


export default class ApView extends React.Component {

    static defaultProps = {
    };

    constructor(props) {
        super(props);
    };

    state = {
        ap_list : []
    };

    componentDidMount() {
    }

    loadData() {
    };

    changeTab = (value) => {
    };

    activeTab = (value) => {
    };

    render() {
        return (
            <Layout type="row">
                <Fixed className="sidebar">
                    234234234324
                </Fixed>

                <Flex>
                    <Tabs ref="tab" onChange={this.changeTab}>
                        <Tab label="AP 목록" value="0" onActive={this.activeTab}>
                            <p>
                                sdfsdfsdfsdfsdf
                            </p>
                        </Tab>
                        <Tab label="AP 관리" value="1" onActive={this.activeTab}>
                            <p>
                                This is another example of a tab template!
                            </p>
                        </Tab>
                        <Tab label="AP 접속이력" value="2" onActive={this.activeTab}>
                            <p>
                                21497219487987
                            </p>
                        </Tab>
                    </Tabs>
                </Flex>
            </Layout>
        )
    };
}

