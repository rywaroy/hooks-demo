import React, { Component } from 'react';
import { Table } from 'antd';

class BTable extends Component {
    
    componentDidMount() {
        console.log('table 加载成功');
    }

    render() {
        
        return (
            <Table {...this.props} />
        );
    }
}
 
export default BTable;