import React from 'react';
import { Table } from 'antd';
import ListFilter from '../components/ListFilter';
import { getStudentList } from '../services';
import styles from './index.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      formData: {},
      current: 1,
      total: 0,
      pageSize: 10,
    };
  }

  /**
   * 搜索
   */
  onSearch = values => {
    this.setState({
        formData: values,
      }, () => this.getList());
  };

  /**
   * 重置
   */
  onReset = () => {
    this.setState({
        formData: {},
      }, () => this.getList());
  };

  getList(params) {
    const { formData, current, pageSize } = this.state;
    getStudentList({
      ...formData,
      current,
      pageSize,
    }).then(res => {
      this.setState({
        list: res.data,
        total: res.total,
      });
    });
  }

  // 分页
  onPageChange = (current) => {
    this.setState({
      current,
    }, () => this.getList());
  };

  // 页码变化
  onShowSizeChange = (current, size) => {
    this.setState({
      current,
      pageSize: size,
    }, () => this.getList());
  };

  componentDidMount() {
    this.getList();
  }

  render() {
    const columns = [
      { title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender' },
      { title: '操作', key: 'action', render: () => <a>编辑</a> },
    ];
    const { list, total, current, pageSize } = this.state;
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
      <div className={styles.wrap}>
        <ListFilter onSearch={this.onSearch} onReset={this.onReset} />
        <Table columns={columns} dataSource={list} rowKey="id" pagination={pagination} />
      </div>
    );
  }
}
