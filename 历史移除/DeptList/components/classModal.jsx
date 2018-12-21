import React, { Component } from 'react';
import { Modal, Form, Input, Checkbox, Button } from 'antd';
import styles from './classModal.less';

const FormItem = Form.Item;

@Form.create()
export default class ClassModal extends Component {
  handleSubmit = isGo => {
    const { form, onOk } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onOk(isGo, values);
        form.resetFields();
      }
    });
  };

  onCancel = () => {
    const { form, onCancel } = this.props;
    form.resetFields();
    onCancel();
  };

  footerRender = () => {
    return (
      <div>
        <Button onClick={this.onCancel}>取消</Button>
        <Button
          onClick={() => {
            this.handleSubmit(false);
          }}
          type="primary"
        >
          保存
        </Button>
        <Button
          onClick={() => {
            this.handleSubmit(true);
          }}
          type="primary"
        >
          继续新建
        </Button>
      </div>
    );
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const {
      visible,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <Modal
          title="新增组"
          visible={visible}
          onCancel={this.onCancel}
          width="530px"
          footer={this.footerRender()}
          wrapClassName={styles.newmodal}
        >
          <Form>
            <FormItem {...formItemLayout} label={<span>组名</span>}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    message: '请输入组名!',
                    required: true,
                    whitespace: true,
                  },
                ],
              })(<Input style={{ marginLeft: '32px' }} placeholder="请输入组名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>组长</span>}>
              {getFieldDecorator('teamLeader', {
                rules: [
                  {
                    message: '组长姓名有误!',
                    required: true,
                    whitespace: true,
                    pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,20}$/,
                  },
                ],
              })(<Input style={{ marginLeft: '32px' }} placeholder="请输入组长姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>组长身份证号</span>}>
              {getFieldDecorator('idCard', {
                rules: [
                  {
                    message: '组长身份证号码有误!',
                    required: true,
                    whitespace: true,
                    pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                  },
                ],
              })(<Input style={{ marginLeft: '32px' }} placeholder="请输入组长身份证号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>组长电话</span>}>
              {getFieldDecorator('teamLeaderPhone', {
                rules: [
                  {
                    message: '组长电话号码有误!',
                    required: true,
                    whitespace: true,
                    pattern: /^1[34578]\d{9}$/,
                  },
                ],
              })(<Input style={{ marginLeft: '32px' }} placeholder="请输入组长电话号码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>联系人</span>}>
              {getFieldDecorator('contacts', {
                rules: [
                  {
                    message: '联系人姓名有误!',
                    pattern: /^[\u4E00-\u9FA5A-Za-z]+$/,
                  },
                ],
              })(<Input style={{ marginLeft: '32px' }} placeholder="请输入联系人姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>联系人电话</span>}>
              {getFieldDecorator('contactsPhone', {
                rules: [
                  {
                    message: '联系人电话有误!',
                    pattern: /^1[34578]\d{9}$/,
                  },
                ],
              })(<Input style={{ marginLeft: '32px' }} placeholder="请输入联系人电话" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>是否特批组</span>}>
              {getFieldDecorator('specialTeam', {})(<Checkbox style={{ marginLeft: '32px' }} />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
