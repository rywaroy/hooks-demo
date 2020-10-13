import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onOk(values);
      }
    })
  }

  render() {
    const { visible, form, userInfo = {}, onCancel } = this.props;
    const { age, gender, name } = userInfo;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={this.onOk}>
        <Form>
          <Form.Item label="姓名">
            {
              getFieldDecorator('name', {
                initialValue: name,
              })(<Input />)
            }
          </Form.Item>
          <Form.Item label="年龄">
            {
              getFieldDecorator('age', {
                initialValue: age,
              })(<Input />)
            }
          </Form.Item>
          <Form.Item label="性别">
            {
              getFieldDecorator('gender', {
                initialValue: gender,
              })(
                <Select>
                  <Select.Option value={'男'}>男</Select.Option>
                  <Select.Option value={'女'}>女</Select.Option>
                </Select>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
 
export default Form.create()(UserModal);