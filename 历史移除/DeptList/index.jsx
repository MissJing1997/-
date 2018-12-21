import React, { Component } from 'react';
import ListContent from 'src/components/ListContent/index';
import { Button, Modal, Icon, Input } from 'antd';
import { connect } from 'dva';
import { getPageQuery } from 'src/utils/utils';
import ProjectLayout from 'src/layouts/ProjectLayout';
import GroupNameList from 'src/pages/components/StaffManage/GroupNameList/GroupList';
import Header from './components/Header';
import styles from './index.less';

/* 暂不开放，后续会有改动 */

/* function info() {
  Modal.info({
    width: "660px",
    iconType: "none",
    centered: true,
    content: (
      <div className={styles.modal}>
        <h2>您的项目还没有班/组，请为项目新建第一个班吧!</h2>
        <p>
          一、说明：为了清晰的表示项目的组织结构层级，请按照班-组的结构形式新增。
        </p>
        <p>
          二、什么是班呢？假设您的项目一共有3组人做木工，那他们一并被划分至
          "木工班" 下。班仅作为一个区分的层级。
        </p>
        <p>
          三、什么是组呢？就是工班长带领的工人形成的小组。这也是项目的最小组织架构。
        </p>
      </div>
    ),
    onOk() {},
  });
} */

@connect(({ deptList, projectList }) => ({
  deptList,
  projectList,
}))
export default class GroupList extends Component {
  constructor(props) {
    super(props);
    const { name } = getPageQuery();
    this.state = {
      visible: false,
      value: '',
      msg: '',
      name,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onChange = e => {
    this.dataString = e.target.value;
    this.setState({
      value: e.target.value,
      msg: '',
    });
  };

  hideModal = () => {
    const { value } = this.state;
    if (!value) {
      this.setState({
        msg: '部名不能为空',
      });

      return;
    }
    this.setState({
      visible: false,
      value: '',
    });
    const query = this.dataString;
    if (!query) return;
    const { dispatch } = this.props;
    dispatch({
      type: 'deptList/addpartList',
      payload: {
        name: query,
      },
    });
  };

  hideModals = () => {
    this.setState({
      visible: false,
      value: '',
      msg: '',
    });
  };

  searchBtn = () => {
    const { name } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'deptList/getSearch',
      data: { name },
    });
  };

  handleFormSubmit = e => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    const { dispatch, projectList, deptList } = this.props;
    const { value, visible, msg } = this.state;
    return (
      <ProjectLayout
        title="部名录"
        action={
          <>
            <Button type="dashed" className={styles.newclass} onClick={this.showModal}>
              <Icon className={styles.plussign} type="plus" />
              <span>新增部</span>
            </Button>
          </>
        }
      >
        <Header
          {...this.state}
          searchBtn={this.searchBtn}
          handleFormSubmit={this.handleFormSubmit}
        />

        <ListContent
          renderItem={item => <GroupNameList {...item} />}
          namespace="deptList"
          initParams={{ projectId: projectList.currPro ? projectList.currPro.id : '', type: 0 }}
          dispatch={dispatch}
          model={deptList}
          rowKey="id"
          listConfig={{ grid: { gutter: 16, column: 4 } }}
          emptyConfig={{
            icon: 'icon-Team',
            text: '您的项目还没有部，请为项目新建第一个部吧！',
          }}
        />

        <Modal
          title="新增部"
          visible={visible}
          onOk={this.hideModal}
          onCancel={this.hideModals}
          okText="确认"
          cancelText="取消"
          width="530px"
          className={styles.newmodal}
        >
          <div className={styles.msgings}>
            <p className={styles.msging}>{msg}</p>
          </div>
          <span className={styles.newname}>输入部名 : </span>
          <Input
            value={value}
            className={styles.enetr}
            onChange={this.onChange}
            size="default"
            placeholder="输入新的部名称"
          />
        </Modal>
      </ProjectLayout>
    );
  }
}
