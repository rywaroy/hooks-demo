import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, message } from 'antd';
import ListFilter from '../components/ListFilter';
import UserModal from '../components/UserModal';
// import ATable from '../components/ATable';
import BTable from '../components/BTable';
import aHOC from '../hoc/aHOC';
import bHOC from '../hoc/bHOC';
import { getStudentList, addStudent, updateStudent, getClasses } from '../services';
import { useAntdTable, useModal } from 'behooks';
import useClasses from './hooks/useClasses';
import styles from './index.less';

// const ATable = aHOC(BTable);

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  

  const formRef = useRef(null);

  const getData = ({ current, pageSize }, formData) => {
    return getStudentList({
      ...formData,
      current,
      pageSize,
    });
  };

  const { tableProps, refresh, search } = useAntdTable(getData, {
    form: formRef.current ? formRef.current.getForm() : false,
    formatResult: (res) => ({
      list: res.data,
      total: res.total,
    }),
  });

  const { submit, reset } = search;

  const { toggle, modalProps } = useModal();

  /**
   * 打开编辑学生弹窗
   */
  const openUserModal = record => {
    setUserInfo(record);
    toggle();
  }

  /**
   * 关闭编辑学生弹窗
   */
  // const closeUserModal = () => {
  //   setVisible(false);
  // }

  /**
   * 编辑/新增
   */
  const edit = values => {
    if (userInfo.id) { // 编辑
      updateStudent({
        id: userInfo.id,
        ...values,
      }).then(() => {
        refresh();
        toggle();
        message.success('编辑成功');
      });
    } else { // 新增
      addStudent(values)
        .then(() => {
          refresh();
          toggle();
          message.success('新增成功');
        });
    }
  }

  // 获取班级列表
  const classes = useClasses();

  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    { title: '性别', dataIndex: 'gender' },
    { title: '班级', dataIndex: 'classes' },
    { title: '操作', key: 'action', render: (record) => <a onClick={() => openUserModal(record)}>编辑</a> },
  ];

  

  return (
    <div className={styles.wrap}>
      <ListFilter onSearch={submit} onReset={reset} ref={formRef} classes={classes} />
      <Button type="primary" onClick={() => openUserModal({})}>新增</Button>
      <Table columns={columns} rowKey="id" {...tableProps} />
      <UserModal
        {...modalProps}
        userInfo={userInfo}
        onOk={edit} />
    </div>
  );
}

export default App;
