import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, message } from 'antd';
import ListFilter from '../components/ListFilter';
import UserModal from '../components/UserModal';
// import ATable from '../components/ATable';
import BTable from '../components/BTable';
import aHOC from '../hoc/aHOC';
import bHOC from '../hoc/bHOC';
import { getStudentList, addStudent, updateStudent } from '../services';
import { useAntdTable } from 'behooks';
import styles from './index.less';

// const ATable = aHOC(BTable);

const App = () => {
  // const [visible, setVisible] = useState(false);
  // const [key, setKey] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const [num, setNum] = useState(1);

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

  /**
   * 打开编辑学生弹窗
   */
  // const openUserModal = record => {
  //   setVisible(true);
  //   setKey(Math.random());
  //   setUserInfo(record);
  // }

  /**
   * 关闭编辑学生弹窗
   */
  // const closeUserModal = () => {
  //   setVisible(false);
  // }

  const { openUserModal, closeUserModal, modalProps } = getModal(setNum);

  console.log(modalProps);

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
        closeUserModal();
        message.success('编辑成功');
      });
    } else { // 新增
      addStudent(values)
        .then(() => {
          refresh();
          closeUserModal();
          message.success('新增成功');
        });
    }
  }

  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    { title: '性别', dataIndex: 'gender' },
    { title: '操作', key: 'action', render: (record) => <a onClick={() => openUserModal(record)}>编辑</a> },
  ];

  return (
    <div className={styles.wrap}>
      <ListFilter onSearch={submit} onReset={reset} ref={formRef} />
      <Button type="primary" onClick={() => openUserModal({})}>新增</Button>
      <Table columns={columns} rowKey="id" {...tableProps} />
      <UserModal
        {...modalProps}
        userInfo={userInfo}
        onCancel={closeUserModal}
        onOk={edit} />
    </div>
  );
}

let key = 1;
let visible = false;

function getModal(setNum) {
  /**
   * 打开编辑学生弹窗
   */
  const openUserModal = record => {
    visible = true;
    key = Math.random();
    setNum(Math.random());
  }

  /**
   * 关闭编辑学生弹窗
   */
  const closeUserModal = () => {
    visible = false;
    setNum(Math.random());
  }

  return {
    openUserModal,
    closeUserModal,
    modalProps: {
      visible,
      key,
    }
  }
}

export default App;
