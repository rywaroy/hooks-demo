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
    };
  }

  /**
   * 搜索
   */
  onSearch = values => {
    this.setState(
      {
        formData: values,
      },
      () => {
        this.getList();
      },
    );
  };

  /**
   * 重置
   */
  onReset = () => {
    this.setState(
      {
        formData: {},
      },
      () => {
        this.getList();
      },
    );
  };

  getList() {
    const { formData } = this.state;
    getStudentList(formData).then(res => {
      this.setState({
        list: res.data,
      });
    });
  }

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
    const { list } = this.state;

    return (
      <div className={styles.wrap}>
        <ListFilter onSearch={this.onSearch} onReset={this.onReset} />
        <Table columns={columns} dataSource={list} rowKey="id" />
      </div>
    );
  }
}
