import { useState } from 'react';
import { useModal } from 'behooks';
import { message } from 'antd';
import { addStudent, updateStudent } from '../../services';

export default function useEditStudent(refresh) {
  const [userInfo, setUserInfo] = useState({});
  const { toggle, modalProps } = useModal();

  /**
   * 打开编辑学生弹窗
   */
  const openUserModal = record => {
    setUserInfo(record);
    toggle();
  }

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

  return {
    modalProps,
    openUserModal,
    edit,
    userInfo,
  }
}
