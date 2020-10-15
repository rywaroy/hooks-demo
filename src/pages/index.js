import React from 'react';
import { Table, Button, message } from 'antd';
import ListFilter from '../components/ListFilter';
import UserModal from '../components/UserModal';
// import ATable from '../components/ATable';
import BTable from '../components/BTable';
import aHOC from '../hoc/aHOC';
import bHOC from '../hoc/bHOC';
import { getStudentList, addStudent, updateStudent } from '../services';
import styles from './index.less';

const ATable = aHOC(BTable);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      formData: {},
      current: 1,
      total: 0,
      pageSize: 10,
      visible: false,
      key: 1,
      userInfo: {},
    };
  }

  /**
   * 搜索
   */
  onSearch = values => {
    this.getList({
      formData: values,
      current: 1,
    });
  };

  /**
   * 重置
   */
  onReset = () => {
    this.getList({
      formData: {},
      current: 1,
    });
  };

  getList = (params = {}) => {
    this.setState(params, () => this.fetch());
  }

  /**
   * 请求列表
   */
  fetch() {
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

  /**
   * 打开编辑学生弹窗
   */
  openUserModal = record => {
    this.setState({
      userInfo: record,
      visible: true,
      key: Math.random(),
    })
  }

  /**
   * 关闭编辑学生弹窗
   */
  closeUserModal = () => {
    this.setState({
      visible: false,
    })
  }

  /**
   * 编辑/新增
   */
  edit = values => {
    const { userInfo } = this.state;
    if (userInfo.id) { // 编辑
      updateStudent({
        id: userInfo.id,
        ...values,
      }).then(() => {
        this.getList();
        this.closeUserModal();
        message.success('编辑成功');
      });
    } else { // 新增
      addStudent(values)
        .then(() => {
          this.getList();
          this.closeUserModal();
          message.success('新增成功');
        });
    }
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    const columns = [
      { title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender' },
      { title: '操作', key: 'action', render: (record) => <a onClick={() => this.openUserModal(record)}>编辑</a> },
    ];
    const { list, total, current, pageSize, visible, key, userInfo } = this.state;

    return (
      <div className={styles.wrap}>
        <ListFilter onSearch={this.onSearch} onReset={this.onReset} />
        <Button type="primary" onClick={() => this.openUserModal({})}>新增</Button>
        {/* <Table columns={columns} dataSource={list} rowKey="id" pagination={pagination} /> */}
        <ATable
          total={total}
          current={current}
          pageSize={pageSize}
          getList={this.getList}
          columns={columns}
          dataSource={list}
          rowKey="id" />
        <UserModal
          visible={visible}
          key={key}
          userInfo={userInfo}
          onCancel={this.closeUserModal}
          onOk={this.edit} />
      </div>
    );
  }
}
