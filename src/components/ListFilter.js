import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';

class ListFilter extends React.Component {
  handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onSearch } = this.props;
        if (onSearch) {
          onSearch(values);
        }
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.props.onReset();
  };

  /**
   * 重置
   */
  handelSearchClear() {
    this.props.form.resetFields();
    this.handleSubmit();
  }

  render() {
    const { form, classes } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Row>
            <Col span={6}>
              <Form.Item label="姓名">
                {getFieldDecorator('name')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="年龄">
                {getFieldDecorator('age')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="性别">
                {getFieldDecorator('gender')(
                  <Select>
                    <Select.Option value={'男'}>男</Select.Option>
                    <Select.Option value={'女'}>女</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="班级">
                {getFieldDecorator('classes')(
                  <Select>
                    {
                      classes.map(item => (
                        <Select.Option value={item} key={item}>{item}</Select.Option>
                      ))
                    }
                    
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={this.handleSubmit}>
                查询
              </Button>
              &nbsp;&nbsp;
              <Button onClick={this.handleReset}>重置</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ListFilter);
