import React from 'react'
import ReactDOM from 'react-dom'

import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

export default class FirmwareTable extends React.Component {

    static defaultProps = {
        sensor_list : []
    };

    constructor(props){
        super(props);

        this.state = {
            table_height : (app.app_store.app_info.window_height-30-50)+"px",
            sensor_list : props.sensor_list
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        this.state = {
            table_height : (app.app_store.app_info.window_height-30-50)+"px",
            sensor_list : props.sensor_list
        }
    }

    render() {
        var items;
        if(this.state.sensor_list != null) {
            items = this.state.sensor_list.map((item, key) => {
                return <TableRow key={key}>
                    <TableRowColumn>{item.fw_type_str}</TableRowColumn>
                    <TableRowColumn>{item.fw_version_str}</TableRowColumn>
                    <TableRowColumn>{item.file_name}</TableRowColumn>
                    <TableRowColumn>{item.checksum}</TableRowColumn>
                    <TableRowColumn>{item.server_check}</TableRowColumn>
                </TableRow>
            });
        }

        return (
            <Table
                height={this.state.table_height}
                fixedHeader={true}
                fixedFooter={false}
                selectable={true}
                multiSelectable={false}>
                <TableHeader enableSelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn >타입</TableHeaderColumn>
                        <TableHeaderColumn >버전</TableHeaderColumn>
                        <TableHeaderColumn >파일</TableHeaderColumn>
                        <TableHeaderColumn >체크썸</TableHeaderColumn>
                        <TableHeaderColumn >서버확인</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    deselectOnClickaway={false}
                    showRowHover={false}
                    stripedRows={false}>
                    {items}
                </TableBody>
            </Table>
        );
    }

}