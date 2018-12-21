import React, { Component } from 'react';
import { Form, Select, Input, Button } from 'antd';
import queryString from 'query-string';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create({
  mapPropsToFields: ({ inGroupState, workerType, name }) => ({
    inGroupState: Form.createFormField({
      value: inGroupState,
    }),
    workerType: Form.createFormField({
      value: workerType,
    }),
    name: Form.createFormField({
      value: name,
    }),
  }),
})
export default class Search extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    const formObj = form.getFieldsValue();

    onSubmit(formObj);
  };

  resetHandler = () => {
    const { form, onSubmit } = this.props;
    form.resetFields();
    onSubmit({});
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const searchVal = queryString.parse(location.search);

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="状态">
          {getFieldDecorator('inGroupState', {
            rules: [],
            initialValue: searchVal.approachState,
          })(
            <Select style={{ width: 120 }} placeholder="请选择入场状态">
              <Option value="0">所有</Option>
              <Option value="1">在组</Option>
              <Option value="2">离组</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="工种">
          {getFieldDecorator('workerType', {
            rules: [],
            initialValue: searchVal.workType,
          })(
            <Select style={{ width: 120 }} placeholder="请选择工种">
              <Option value="">所有</Option>
              <Option value="0">普工</Option>
              <Option value="1">技工</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [],
            initialValue: searchVal.workerName,
          })(<Input style={{ minWidth: '300px' }} placeholder="输入姓名关键字搜索" />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '60px', height: '32px' }}
            icon="search"
          />
          <Button style={{ marginLeft: '12px', color: '#5088FF' }} onClick={this.resetHandler}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}
