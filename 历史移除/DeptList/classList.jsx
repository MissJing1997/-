import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import { getPageQuery } from 'src/utils/utils';
import TeamList from 'src/pages/components/StaffManage/GroupNameList/TeamList';
import ListContent from 'src/components/ListContent/index';
import ProjectLayout from 'src/layouts/ProjectLayout';
import Header from './components/Header';
import ClassModal from './components/classModal';
import styles from './classList.less';

@connect(({ workerClassList }) => ({
  workerClassList,
}))
class classList extends Component {
  constructor(props) {
    super(props);
    const { name } = getPageQuery();
    this.state = {
      visible: false,
      name,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = (isGo, data) => {
    if (!isGo) {
      this.setState({
        visible: false,
      });
    }
    const { specialTeam } = data;

    const { dispatch, match } = this.props;
    const { departmentId } = match.params;
    dispatch({
      type: 'workerClassList/addGroup',
      payload: {
        ...data,
        departmentId,
        isSpecial: specialTeam ? 1 : 0,
      },
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  searchBtn = () => {
    const { name } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'workerClassList/classList',
      name,
    });
  };

  handleFormSubmit = e => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    const { dispatch, match, workerClassList } = this.props;
    const { departmentId } = match.params;
    const { visible } = this.state;
    const { departmentName } = getPageQuery();
    return (
      <ProjectLayout
        title={departmentName}
        action={
          <>
            <Button type="dashed" className={styles.newclass} onClick={this.showModal}>
              <Icon className={styles.plussign} type="plus" />
              <span onClick={this.showModal}>新增班里的组</span>
            </Button>
          </>
        }
        content={
          <Header
            {...this.state}
            searchBtn={this.searchBtn}
            handleFormSubmit={this.handleFormSubmit}
          />
        }
      >
        <ClassModal visible={visible} onOk={this.hideModal} onCancel={this.onCancel} />
        <ListContent
          renderItem={item => <TeamList {...item} />}
          namespace="workerClassList"
          initParams={{departmentId}}
          dispatch={dispatch}
          model={workerClassList}
          rowKey="id"
          emptyConfig={{
            icon: 'icon-Team',
            text: '您的项目还没有部，请为项目新建第一个部吧！',
          }}
        />
      </ProjectLayout>
    );
  }
}

export default classList;
