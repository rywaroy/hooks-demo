import React, { Component } from 'react';

export default function aHOC (WrappedComponent) {
    return class extends Component {
        onPageChange = (current) => {
            this.props.getList({ current });
        }
    
        // 页码变化
        onShowSizeChange = (current, pageSize) => {
            this.props.getList({ current, pageSize });
        }
    
        render() {
    
            const { total, current, pageSize, ...other } = this.props;
    
            const pagination = {
                pageSizeOptions: [ '10', '30', '50' ],
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `共 ${total} 条`,
                total,
                current,
                pageSize,
                onChange: this.onPageChange,
                onShowSizeChange: this.onShowSizeChange
            };
            
            return (
                <WrappedComponent {...other} pagination={pagination} />
            );
        }
    }
}