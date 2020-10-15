import React, { Component } from 'react';

export default function bHOC (WrappedComponent) {
    return class extends Component {
        
        componentDidMount() {
            console.log('table 加载成功');
        }
    
        render() {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    }
}